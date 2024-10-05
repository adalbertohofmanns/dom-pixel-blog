import { mockPosts } from '@/data/mockPosts';
import { IPost } from '@/types/post';
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string) {
  const [posts, setPosts] = useState<IPost[]>(() => {
    if (typeof window === 'undefined') {
      // Retorna um array vazio ou algum valor inicial adequado para o servidor
      return [] as unknown as T;
    }
    const storedPosts = localStorage.getItem(key);
    return storedPosts ? JSON.parse(storedPosts) : [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(posts));
    }
  }, [posts, key]);

  const addPostsFromMock = () => {
    setPosts(mockPosts);
  };

  const addPost = (newPost: IPost) => {
    setPosts([...posts, newPost]);
  };

  const showPost = (id: string) => {
    return posts.find((post: IPost) => post.id === id);
  };

  const updatePost = (id: string, updatedPost: IPost) => {
    const postIndex = posts.findIndex((post: IPost) => post.id === id);
    if (postIndex === -1) {
      return null;
    }
    setPosts(posts.map((post: IPost) => (id === updatedPost.id ? updatedPost : post)));
  };

  const deletePost = (postId: string) => {
    const postIndex = posts.findIndex((post: IPost) => post.id === postId);
    if (postIndex === -1) {
      return null;
    }
    setPosts(posts.filter((post: IPost) => post.id !== postId));
  };

  return {
    posts,
    addPostsFromMock,
    addPost,
    showPost,
    updatePost,
    deletePost,
  };
}

export default useLocalStorage;