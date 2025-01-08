// src/app/hooks/useRegister.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../../services/apiClient';

const useRegister = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/register', {
        nombre: name,
        email,
        password,
      });
      setMessage(response.data.message);
      router.push('/auth/verify');
    } catch (error) {
      setMessage('Error al registrar el usuario.');
      console.error('Error:', error);
    }
  };

  return { handleRegister, message };
};

export default useRegister;
