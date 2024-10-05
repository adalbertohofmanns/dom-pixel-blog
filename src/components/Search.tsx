'use client';
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Input, CloseButton, rem, Text, ScrollArea, Divider, Image } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { formatDate } from '@/utils/date';
import { IPost } from '@/types/post';

function Search() {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchvalue, setSearchValue] = useState('');

  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json(); 
        setPosts(data);
      } catch (error) {
        console.error('Erro ao buscar os posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const searchResults = posts.filter((post) => post.title.toLowerCase().includes(searchvalue.toLowerCase()));

  const renderSearch = (
    <Input
      placeholder="Procurar"
      value={searchvalue}
      onChange={(event) => setSearchValue(event.currentTarget.value)}
      rightSectionPointerEvents="all"
      leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
      rightSection={
        <CloseButton
          aria-label="Clear input"
          onClick={() => setSearchValue('')}
          style={{ display: searchvalue ? undefined : 'none' }}
        />
      }
      autoFocus
    />
  )

  const renderResults = searchResults.map((post) => (
    <Link href={`/${post.id}`} key={post.id} onClick={close} className='flex flex-col gap-2 items-center p-5 rounded-md transition-transform duration-150 ease-in-out hover:scale-[1.01] hover:shadow-md bg-slate-200'>
      <Image
        alt={post.title}
        radius="md"
        src={post.image}
        className="max-w-[60%]"
      />
      <Text>{post.title}</Text>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700}>{formatDate(post.createdAt)}</Text>
    </Link>
  ));

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Procurar post">
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <div className="px-5">
            {renderSearch}
          </div>
          
          <Divider my="sm" />
          
          <div className="px-5">
            <div className="flex flex-col gap-5">
              {searchvalue.length > 3 ? renderResults : null}
            </div>
          </div>

        </ScrollArea>
      </Drawer>
      
      <IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} onClick={open} className='hover:scale-110 cursor-pointer' />

    </>
  );
}

export default Search;
