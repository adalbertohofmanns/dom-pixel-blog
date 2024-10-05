"use client";
import { Drawer, TextInput, Button, PasswordInput, ScrollArea, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import { yupResolver } from 'mantine-form-yup-resolver';
import * as yup from 'yup';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { login } from '@/firebaseAuth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';

const userSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export default function Login() {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  // @ts-ignore
  const [user, setUser] = useState<any | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: yupResolver(userSchema),
  });

  const handleLoginSubmit = async (values: {email: string, password: string}) => {
    try {
      await login(values.email, values.password).then(() => {
        close();
      });
    } catch (err) {
      notifications.show({
        title: 'Erro',
        message: `Usuário não encontrado ou senha incorreta (${err})`,
        color: 'red',
        position: 'top-right',
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Login" zIndex={1000000}>
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <div className="px-5">
            <form 
              onSubmit={form.onSubmit(handleLoginSubmit)}
              onChange={ () => console.log(form.errors) }
              className="flex flex-col gap-5"
            >
              <TextInput
                label="Email"
                placeholder="Email do usuário"
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Senha"
                placeholder="Senha do usuário"
                {...form.getInputProps('password')}
              />

              <Button type="submit">Login</Button>
            </form>
          </div>
        </ScrollArea>
      </Drawer>

      {user && <Button onClick={handleLogout}>Sair</Button>}
      {!user && <Button onClick={open}>Login</Button>}
    </>
  );
}
