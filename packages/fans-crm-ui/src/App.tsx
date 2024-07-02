import React, { useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './providers/AuthProvider';
import axios from 'axios';

function App() {
  const { auth, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      navigate('/user');
    } else {
      const token = localStorage.getItem('jwt-token');
      const userId = localStorage.getItem('user-id');

      if (token && userId) {
        axios
          .get(`http://localhost:1488/api/v1/get-user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((data) => {
            setUser(data.data);
          });
      } else {
        navigate('/login');
      }
    }
  }, [auth]);

  return <div className="App">Home page</div>;
}

export default App;
