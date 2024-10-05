"use client";
import { yupResolver } from 'mantine-form-yup-resolver';
import * as yup from 'yup';
import { useForm } from '@mantine/form';
import { IPost } from "@/types/post";
import { Container, TextInput, Title, Textarea, Button, FileInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

const schema = yup.object().shape({
  id: yup.string(),
  title: yup.string().required().min(2, 'Título deve ter pelo menos 2 letras'),
  body: yup.string().required().min(10, 'Conteúdo deve ter pelo menos 10 letras'),
  image: yup.string().required('URL da imagem é obrigatória'),
  userId: yup.string(),
  createdAt: yup.string(),
});

export default function Page() {
  const generateId = () => Math.random().toString(36).substr(2, 9);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      id: '',
      title: '',
      body: '',
      image: '',
      userId: '',
      createdAt: '',
    },
    validate: yupResolver(schema),
  });

  const handleSubmit = async (values: IPost) => {
    const newPost = {
      ...values,
      id: generateId(),
      createdAt: new Date().toISOString(),
      userId: 1,
    };

    const reader = new FileReader();

    reader.readAsDataURL(values.image as unknown as Blob);

    await new Promise<void>((resolve) => {
      reader.onload = () => {
        newPost.image = reader.result as string;
        resolve();
      };
    });

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    if (res.ok) {
      const post = await res.json();
      form.reset();
      router.push(`/${post}`);
    } else {
      const errorData = await res.json();
      notifications.show({
        title: 'Erro',
        message: errorData.message || 'Erro ao criar o post',
        color: 'red',
        position: 'top-right',
      });
      form.setErrors(errorData.message || 'Erro ao criar o post');
    }
    
  };

  return (
    <Container>
      <Title className="text-center my-20">
        Adicionar novo Post
      </Title>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col gap-5"
      >
        <TextInput
          label="Título"
          placeholder="Título do post"
          {...form.getInputProps('title')}
        />
        <Textarea
          label="Conteúdo"
          placeholder="Conteúdo do post"
          {...form.getInputProps('body')}
        />
        <FileInput
          label="Imagem"
          placeholder="Selecione uma imagem"
          {...form.getInputProps('image')}
        />

        <Button type="submit">Criar Post</Button>
      </form>
    </Container>

  );
}