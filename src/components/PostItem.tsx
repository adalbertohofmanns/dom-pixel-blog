import { IPost } from '@/types/post'
import { formatDate } from '@/utils/date'
import { Card, AspectRatio, Image, Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

interface PostItemProps {
  post: IPost
}

function PostItem({ post }: PostItemProps) {
  return (
    <Card key={post.id} p="md" radius="md" component={Link} href={post.id} className="transition-transform duration-150 ease-in-out hover:scale-[1.01] hover:shadow-md border bg-slate-200">
      <AspectRatio ratio={1920 / 1080}>
        <Image src={post.image} />
      </AspectRatio>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        { formatDate(post.createdAt) }
      </Text>
      <Text className="font-bold font-sans" mt={5}>
        {post.title}
      </Text>
    </Card>
  )
}

export default PostItem