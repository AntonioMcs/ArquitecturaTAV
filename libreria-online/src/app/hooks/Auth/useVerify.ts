// src/app/hooks/useVerify.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../../services/apiClient';

const useVerify = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleVerify = async (code: string) => {
    try {
      const response = await apiClient.post('/auth/verify', { code });
      setMessage(response.data.message);
      router.push('/auth/login');
    } catch (error) {
      setMessage('Error al verificar el usuario.');
      console.error('Error:', error);
    }
  };

  return { handleVerify, message };
};

export default useVerify;
