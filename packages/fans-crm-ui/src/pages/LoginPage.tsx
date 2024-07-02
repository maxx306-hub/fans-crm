import React, { useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

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
    <Container
      sx={{
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>

      <form onSubmit={onSubmit}>
        <Box
          sx={{
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <TextField {...register('email', { required: true })} />
            {errors.email && <span>This field is required</span>}
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <TextField
              {...register('password', { required: true })}
              type="password"
            />
            {errors.password && <span>This field is required</span>}
          </Box>

          <Button type="submit" variant="contained">
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default LoginPage;
