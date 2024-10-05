"use client";
import { SimpleGrid, Container, Title, Skeleton, Card } from '@mantine/core';
import { useEffect, useState } from 'react';
import PostItem from './PostItem';
import useLocalStorage from '@/hooks/postLocalStorage';

export function Posts() {
  const { posts, addPostsFromMock } = useLocalStorage('dpPosts');

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (posts.length === 0) {
      addPostsFromMock();
    }

    setTimeout(() => {
      setLoading(false);
    }, 900);
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

  const renderPosts = posts.map((post) => <PostItem post={post} />);

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