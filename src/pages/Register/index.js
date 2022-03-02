import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, FormControl, InputPassword, InputText, LayoutOne } from 'upkit';
import { rules } from './validation';
import * as authApi from './../../api/auth';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async function (formData) {};

  return (
    <LayoutOne size="small">
      <Card color="white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl errorMessage={errors.full_name?.message}>
            <InputText name="full_name" placeholder="Nama Lengkap" fitContainer {...register('full_name', rules.full_name)} />
          </FormControl>
          <FormControl errorMessage={errors.email?.message}>
            <InputText name="email" placeholder="Email" fitContainer {...register('email', rules.email)} />
          </FormControl>
          <FormControl errorMessage={errors.password?.message}>
            <InputPassword name="password" placeholder="Password" fitContainer {...register('password', rules.password)} />
          </FormControl>
          <FormControl errorMessage={errors.password_confirmation?.message}>
            <InputPassword name="password_confirmation" placeholder="Konfirmasi Password" fitContainer {...register('password_confirmation', rules.password_confirmation)} />
          </FormControl>
          <Button size="large" fitContainer>
            Register
          </Button>
        </form>
      </Card>
    </LayoutOne>
  );
}
