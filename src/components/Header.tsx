'use client';
import {
  Group,
  Divider,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Container,
  Text,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import Search from './Search';
import Register from './Register';
import Login from './Login';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
  
export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Container className='flex justify-between h-full items-center w-full'>

        <Group h="100%" gap={20} visibleFrom="sm">
          <Link href="/">
            Home
          </Link>

          {user && (
            <Link href="/new-post">
              Novo post
            </Link>
          )}
        </Group>

        <Group visibleFrom="sm">
          <Search />
          <Text>Olá, {user?.email}</Text>
          <Login />
          {!user && <Register />}
        </Group>

        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />

        <Group hiddenFrom="sm">
          <Search />
        </Group>
      </Container>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          
          <div className="flex gap-5 px-5">
            <Link href="/" onClick={toggleDrawer}>
              Home
            </Link>
            
            {user && (
              <Link href="/new-post">
                Novo post
              </Link>
            )}
          </div>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Login />
            {!user && <Register />}
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
}