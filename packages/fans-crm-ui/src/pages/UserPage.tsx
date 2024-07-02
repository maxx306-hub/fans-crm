import React, { useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated || !auth.user) {
      navigate('/');
    }
  }, [auth]);

  return (
    <div>
      User Page
      <button onClick={() => logout()}>LOGOUT</button>
    </div>
  );
};

export default UserPage;
