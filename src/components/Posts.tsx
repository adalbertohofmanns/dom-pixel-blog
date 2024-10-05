"use client";
import { SimpleGrid, Container, Title, Skeleton, Card } from '@mantine/core';
import { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { IPost } from '@/types/post';

export function Posts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Erro ao buscar os posts:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchPosts();
  }, []);
  
  if (loading) {
    return <Container>
      <Title className="text-center my-20">
        Carregando posts...
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <Skeleton component={Card} p="md" radius="md" className="transition-transform duration-150 ease-in-out hover:scale-[1.01] hover:shadow-md border h-[285.59px]" />
        <Skeleton component={Card} p="md" radius="md" className="transition-transform duration-150 ease-in-out hover:scale-[1.01] hover:shadow-md border h-[285.59px]" />
        <Skeleton component={Card} p="md" radius="md" className="transition-transform duration-150 ease-in-out hover:scale-[1.01] hover:shadow-md border h-[285.59px]" />
        <Skeleton component={Card} p="md" radius="md" className="transition-transform duration-150 ease-in-out hover:scale-[1.01] hover:shadow-md border h-[285.59px]" />
        <Skeleton component={Card} p="md" radius="md" className="transition-transform duration-150 ease-in-out hover:scale-[1.01] hover:shadow-md border h-[285.59px]" />
        <Skeleton component={Card} p="md" radius="md" className="transition-transform duration-150 ease-in-out hover:scale-[1.01] hover:shadow-md border h-[285.59px]" />
        <Skeleton component={Card} p="md" radius="md" className="transition-transform duration-150 ease-in-out hover:scale-[1.01] hover:shadow-md border h-[285.59px]" />
        <Skeleton component={Card} p="md" radius="md" className="transition-transform duration-150 ease-in-out hover:scale-[1.01] hover:shadow-md border h-[285.59px]" />
        <Skeleton component={Card} p="md" radius="md" className="transition-transform duration-150 ease-in-out hover:scale-[1.01] hover:shadow-md border h-[285.59px]" />
        <Skeleton component={Card} p="md" radius="md" className="transition-transform duration-150 ease-in-out hover:scale-[1.01] hover:shadow-md border h-[285.59px]" />
      </SimpleGrid>
    </Container>;
  }

  if (!posts.length) {
    return <Container>
      <Title className="text-center my-20">
        Nenhum post encontrado.
      </Title>
    </Container>;
  }

  const renderPosts = posts.map((post) => <PostItem key={post.id} post={post} />);

  return (
    <>
      <Title className="text-center my-20">
        Bem vido ao Blog Dom Pixel
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {renderPosts}
      </SimpleGrid>
    </>
  );
}