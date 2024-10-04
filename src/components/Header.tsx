'use client';
import {
  Group,
  Button,
  Divider,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Container,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
  
export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <>
      <Container className='flex justify-between h-full items-center'>

        <Group h="100%" gap={20} visibleFrom="sm">
          <a href="#">
            Home
          </a>

          <a href="#">
            Learn
          </a>

          <a href="#">
            Academy
          </a>
        </Group>

        <Group visibleFrom="sm">
          <Button variant="default">Log in</Button>
          <Button>Sign up</Button>
        </Group>

        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
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

            <a href="#">
              Home
            </a>
            
            <a href="#">
              Learn
            </a>
            <a href="#">
              Academy
            </a>
          </div>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
}