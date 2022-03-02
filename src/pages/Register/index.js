import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, FormControl, InputPassword, InputText, LayoutOne } from 'upkit';
import { rules } from './validation';
import * as authApi from './../../api/auth';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [status, setStatus] = React.useState(statuslist.idle);

  const onSubmit = async function (formData) {
    let { password, password_confirmation } = formData;
    if (password !== password_confirmation) {
      return setError('password_confirmation', { type: 'equality', message: 'Konfirmasi password harus dama dengan password' });
    }

    setStatus(statuslist.process);

    let { data } = await authApi.register(formData);

    //cek apakah ada error
    if (data.error) {
      //dapatkan field terkait jika ada errors
      let fields = Object.keys(data.fields);

      // untuk masing-masing field kita terapkan error dan tangkap pesan errornya
      fields.forEach((field) => {
        setError(field, { type: 'server', message: data.fields[field]?.properties?.message });
      });

      setStatus(statuslist.error);
      return;
    }

    setStatus(statuslist.success);
  };

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
          <Button size="large" fitContainer disabled={status === statuslist.process}>
            {status === statuslist.process ? 'Sedang memproses' : 'Mendaftar'}
          </Button>
        </form>
      </Card>
    </LayoutOne>
  );
}
