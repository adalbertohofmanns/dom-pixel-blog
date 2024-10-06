import { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('##########_____________________Search API called');

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { searchTerm } = req.query;

  // Verifique se o termo de pesquisa está presente
  if (!searchTerm) {
    return res.status(400).json({ message: 'Missing search term' });
  }

  try {
    const db = getFirestore();
    const postsCollection = collection(db, 'posts');

    // Criar uma consulta para buscar posts com "title" ou "body" correspondente ao termo de pesquisa
    const q = query(
      postsCollection,
      where('title', '==', searchTerm),
      where('body', '==', searchTerm)
    );

    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}