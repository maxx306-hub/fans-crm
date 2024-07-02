import React, { useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

const UserPage = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated || !auth.user) {
      navigate('/');
    }
  }, [auth]);

  return (
    <Container>
      <Typography component="h1" variant="h5">
        User Page
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Typography component="h1" variant="h6">
          Email: {auth.user?.email}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Typography component="h1" variant="h6">
          Phone: {auth.user?.phone}
        </Typography>
      </Box>

      <Button onClick={() => logout()} variant="outlined">
        LOGOUT
      </Button>
    </Container>
  );
};

export default UserPage;
