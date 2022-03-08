import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { rules } from './validation';
import * as authApi from './../../api/auth';
import { useDispatch } from 'react-redux';
import * as authAction from './../../features/Auth/actions';
import { Button, Card, FormControl, InputPassword, InputText, LayoutOne } from 'upkit';
import StoreLogo from './../../components/StoreLogo';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const [status, setStatus] = useState(statuslist.idle);
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    const { email, password } = formData;

    setStatus(statuslist.process);

    let { data } = await authApi.login(email, password);

    if (data.error) {
      setError('password', { type: 'invalidCredential', message: data.message });

      setStatus(statuslist.error);
      return;
    }

    setStatus(statuslist.success);

    let { user, token } = data;

    dispatch(authAction.userLogin(user, token));

    navigate('/');
  };

  return (
    <LayoutOne size="small">
      <br />
      <Card color="white">
        <>
          <div className="text-center mb-5">
            <StoreLogo />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl errorMessage={errors.email?.message}>
              <InputText placeholder="Email" fitContainer name="email" {...register('email', rules.email)} />
            </FormControl>
            <FormControl errorMessage={errors.password?.message}>
              <InputPassword placeholder="Password" fitContainer name="password" {...register('password', rules.password)} />
            </FormControl>

            <Button fitContainer size="large" disabled={status === 'process'}>
              Login
            </Button>
          </form>

          <div className="text-center mt-2">
            Belum punya akun?{' '}
            <Link to="/register">
              <b>Daftar sekarang.</b>
            </Link>
          </div>
        </>
      </Card>
    </LayoutOne>
  );
}
