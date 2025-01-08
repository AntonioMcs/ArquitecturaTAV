// src/app/hooks/useLogin.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../../services/apiClient';

const useLogin = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      setMessage(response.data.message);
      router.push('/'); 
    } catch (error) {
      setMessage('Error al iniciar sesión.');
      console.error('Error:', error);
    }
  };

  return { handleLogin, message };
};

export default useLogin;
