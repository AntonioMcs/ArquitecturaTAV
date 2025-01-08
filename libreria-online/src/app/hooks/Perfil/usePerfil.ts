// src/app/hooks/usePerfil.ts
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../services/apiClient';

const usePerfil = () =>{

    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleLogin = async (email: string, password: string) => {
        try {
          const response = await apiClient.post('/api/perfil', { email, password });
          setMessage(response.data.message);
          router.push('/'); // Redirigir a la página principal o dashboard
        } catch (error) {
          setMessage('Error al iniciar sesión.');
          console.error('Error:', error);
        }
      };
    
      return { handleLogin, message };

};

export default usePerfil;