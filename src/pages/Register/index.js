import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, FormControl, InputPassword, InputText, LayoutOne } from 'upkit';

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async function (formData) {
    console.log(formData);
  };

  return (
    <LayoutOne size="small">
      <Card color="white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl errorMessage={errors.full_name?.message}>
            <InputText name="full_name" placeholder="Nama Lengkap" fitContainer {...register('full_name', { required: true })} />
          </FormControl>
          <FormControl>
            <InputText name="email" placeholder="Email" fitContainer {...register('email', { required: true })} />
          </FormControl>
          <FormControl>
            <InputPassword name="password" placeholder="Password" fitContainer {...register('password', { required: true })} />
          </FormControl>
          <FormControl>
            <InputPassword name="password_confirmation" placeholder="Konfirmasi Password" fitContainer {...register('password_confirmation', { required: true })} />
          </FormControl>
          <Button size="large" fitContainer>
            Register
          </Button>
        </form>
      </Card>
    </LayoutOne>
  );
}
