"use client";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/postLocalStorage";
import { Container, Image, Title, Text, SimpleGrid, Skeleton, Card, Grid, rem, AspectRatio, GridCol } from "@mantine/core";
import { formatDate } from "@/utils/date";
import userLocalStorage from "@/hooks/userLocalStorage";

function page({ params }: { params: { id: string } }) {
  const { showPost } = useLocalStorage('dpPosts');
  const post = showPost(params.id);

  const [loading, setLoading] = useState(true);

  const { users } = userLocalStorage('dpUsers');

  const user = post ? users.find((user) => user.id === post.userId) : undefined;
  
  useEffect(() => {
    if (post) {
      setLoading(false);
    }
  }, [post]);

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

  if (!post) {
    return <div>Post not found.</div>;
  }
  const PRIMARY_COL_HEIGHT = rem(300);

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

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
            autor: {user?.name || 'Desconhecido'}
          </Text>
        </div>
      </div>
      
    </Container>
  );
};

export default page;
