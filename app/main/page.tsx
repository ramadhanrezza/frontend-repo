'use client';
import FetchButton from '@/components/FetchButton';
import UpdateButton from '@/components/UpdateButton';
import { logoutUser } from '@/store/actions';
import { AppDispatch, RootState } from '@/store/store';
import { Alert, Box, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MainPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const userData = useSelector((state: RootState) => state.user.userData)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/login')
  };

  return (
    <Container component="main" maxWidth="lg">
      <h1>Main Page</h1>
      <p>Welcome to the main page!</p>
      {message && (
        <Alert severity="info" sx={{ width: '100%', mt: 2 }}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
          {error}
        </Alert>
      )}
      <Box>
        {userData ? 
        <UpdateButton setError={setError} userData={userData} />
        : 
          <Box>
            <FetchButton setError={setError} setMessage={setMessage} />
          </Box>
        }
        
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      
    </Container>
  );
};

export default MainPage;