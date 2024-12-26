'use client';
import React, { useEffect } from 'react';
import LoginForm from '../../components/LoginForm';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/main');
    }
  }, [router]);

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;