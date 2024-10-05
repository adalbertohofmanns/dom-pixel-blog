"use client";
import { useEffect, useState } from "react";
import { Container, Image, Title, Text, SimpleGrid, Skeleton, Card, Grid, rem, AspectRatio } from "@mantine/core";
import { formatDate } from "@/utils/date";
import { IPost } from "@/types/post";


function Page({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/post/${params.id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Erro ao buscar os posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, []);
  
  const PRIMARY_COL_HEIGHT = rem(300);
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  if (loading) {
    return <Container>
      <Title className="text-center my-20">
        Carregando post...
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
        <Grid gutter="md">
          <Grid.Col>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
      <div className="flex flex-col gap-5 mt-4">
        <div className="flex justify-between ">
          <Skeleton width={100} height={20} />
          <Skeleton width={100} height={20} />
        </div>
      </div>
    </Container>;
  }

  if (!post) {
    return <div>Post não encontrado.</div>;
  }

  return (
    <Container>
      <Title className="text-center my-20">
        {post.title}
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <AspectRatio ratio={1920 / 1080}>
          <Image
            src={post.image}
            alt={post.title}
            radius="md"
            h={PRIMARY_COL_HEIGHT}
            w="auto"
            className="object-top min-w-full"
          />
        </AspectRatio>
        <Grid gutter="md">
          <Grid.Col>
            <Card h={SECONDARY_COL_HEIGHT}>
              <Text>{post.body}</Text>
            </Card>
          </Grid.Col>
        </Grid>
      </SimpleGrid>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
            data: {formatDate(post.createdAt)}
          </Text>
          <Text className="font-bold font-sans" mt={5}>
            autor: {'Desconhecido'}
          </Text>
        </div>
      </div>
      
    </Container>
  );
};

export default Page;
