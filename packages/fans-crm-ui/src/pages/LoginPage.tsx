import React, { useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const { auth, login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth]);

  const onSubmit = handleSubmit(async (data) => {
    login(data.email, data.password);
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input {...register('email', { required: true })} />
        {errors.email && <span>This field is required</span>}

        <input {...register('password', { required: true })} type="password" />
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default LoginPage;
