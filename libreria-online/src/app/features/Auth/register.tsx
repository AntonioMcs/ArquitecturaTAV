"use client";

import React, { useState } from 'react';
import useRegister from '../../hooks/Auth/useRegister';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '../../assets/img/Logo.svg';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleRegister, message } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister(name, email, password);
  };

  return (
    <div className="h-screen w-full">
      {/* Navbar */}
      <nav className="h-[73px] w-full flex items-center justify-between px-4 md:px-8">
        <Link href="/" passHref>
          <Image src={Logo} alt="El Lector Logo" height={48} width={74} className="cursor-pointer" />
        </Link>
        <a href="/ayuda">
          <button className="h-[40px] w-[120px] md:w-[185px] bg-[#F5F0F0] hover:bg-gray-300 text-[#800020] font-bold rounded-[12px] flex items-center justify-center">Ayuda</button>
        </a>
      </nav>

      {/* Main Content */}
      <main className="h-[calc(100vh-73px)] flex items-center justify-center px-4 md:px-0">
        <div className="w-full max-w-[960px] h-auto md:h-[450px] flex flex-col justify-between items-center space-y-4 md:space-y-0">
          
          <form onSubmit={handleSubmit} className="w-full max-w-[480px] flex flex-col items-center space-y-4">
            <h1 className="w-full text-[18px] md:text-[22px] font-bold mb-4 md:mb-6 text-center md:text-left">Crea una nueva cuenta</h1>
            
            {/* Nombre */}
            <label className="w-full">
              <span className="block text-left mb-2 text-sm md:text-base">Nombre completo</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-[40px] rounded-[12px] bg-[#F5F0F0] focus:outline-none focus:ring-2 focus:ring-red-600 px-3"
              />
            </label>

            {/* Correo Electrónico */}
            <label className="w-full">
              <span className="block text-left mb-2 text-sm md:text-base">Correo Electrónico</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-[40px] rounded-[12px] bg-[#F5F0F0] focus:outline-none focus:ring-2 focus:ring-red-600 px-3"
              />
            </label>

            {/* Contraseña */}
            <label className="w-full">
              <span className="block text-left mb-2 text-sm md:text-base">Contraseña</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-[40px] rounded-[12px] bg-[#F5F0F0] focus:outline-none focus:ring-2 focus:ring-red-600 px-3"
              />
            </label>

            {/* Botón Registrarse */}
            <button 
              type="submit" 
              className="w-full h-[40px] bg-[#800020] text-[#FFFFFF] rounded-[12px] hover:bg-[#AB012B] transition"
            >
              Crear Cuenta
            </button>

            {/* Botón Iniciar Sesión */}
            <a className="w-full" href="/auth/login">
              <button
                type="button"
                className="w-full h-[40px] bg-[#F5F0F0] text-gray-800 rounded-[12px] hover:bg-gray-200 transition"
              >
                Iniciar Sesión
              </button>
            </a>
          </form>

          {message && <p className="mt-4 text-center text-green-500">{message}</p>}

          {/* Texto de condiciones al fondo */}
          <div className="w-full">
            <p className="text-xs text-[#8C5E5E] text-center mt-20">
              Al crear una cuenta, aceptas las <a href="#" className="underline">Condiciones de uso</a> y el <a href="#" className="underline">Aviso de privacidad</a> de El Lector.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;