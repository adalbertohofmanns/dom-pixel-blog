"use client";
import userLocalStorage from '@/hooks/userLocalStorage';

import { Drawer, TextInput, Button, PasswordInput, ScrollArea, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { yupResolver } from 'mantine-form-yup-resolver';
import * as yup from 'yup';
import { useForm } from '@mantine/form';
import { IUser } from '@/types/user';

const userSchema = yup.object().shape({
  id: yup.string(),
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  createdAt: yup.string(),
});

export default function Register() {
  const [opened, { open, close }] = useDisclosure(false);

  const { addUsers } = userLocalStorage('dpUsers');
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const form = useForm({
    initialValues: {
      id: '',
      name: '',
      email: '',
      password: '',
      createdAt: '',
    },
    validate: yupResolver(userSchema),
  });

  const handleRegisterSubmit = (values: IUser) => {
    const newUser = {
      ...values,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };

    addUsers(newUser);
    form.reset();
    close();
  };

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Register" zIndex={1000001}>
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <div className="px-5">
            <form 
              onSubmit={form.onSubmit(handleRegisterSubmit)}
              className="flex flex-col gap-5"
            >
              <TextInput
                label="Nome"
                placeholder="Nome do usuário"
                {...form.getInputProps('name')}
              />
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

              <Button type="submit">Registrar</Button>
            </form>
          </div>
        </ScrollArea>
      </Drawer>

      <Button onClick={open}>Registrar-se</Button>
    </>
  );
}
