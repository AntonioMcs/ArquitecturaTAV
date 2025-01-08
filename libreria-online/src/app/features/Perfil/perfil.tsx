"use client";

import React from "react";
import image from "../../assets/img/image.jpg";
import Image from "next/image";
import Link from "next/link";

import Logo from "../../assets/img/Logo.svg";

const ProfileLayout = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* Navbar */}
      <nav className="h-[73px] w-full flex items-center justify-between px-4 md:px-8 ">
        <Link href="/" passHref>
          <Image
            src={Logo}
            alt="El Lector Logo"
            height={48}
            width={74}
            className="cursor-pointer no-drag"
          />
        </Link>
      </nav>

      {/* Contenido principal */}
      <div className="flex justify-center items-start py-8">
        <div className="w-[926px] bg-gray-200 rounded-lg shadow-md">
          {/* Header Section */}
          <div className="h-[208px] bg-gradient-to-r from-black via-[#800020] to-black rounded-t-lg flex items-center justify-between px-6">
            {/* Avatar e información del usuario */}
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div className="w-[164px] h-[164px] border-2 border-white">
                <Image
                  src={image}
                  alt="User Avatar"
                  height={164}
                  width={164}
                  className="object-cover no-drag"
                />
              </div>

              {/* Nombre y biografía */}
              <div
                className="w-[464px] h-[176px] rounded-lg flex flex-col text-white p-2"
              >
                {/* Nombre en la parte superior */}
                <h1 className="text-2xl font-bold mb-2">Luyz</h1>

                {/* Biografía alineada a la izquierda en el medio vertical */}
                <div className="flex-1 flex items-center">
                  <p className="text-sm margin-adjust">No se ha proporcionado información.</p>
                </div>
              </div>
            </div>

            {/* Información del nivel */}
            <div className="text-right">
              <p className="text-white text-lg">
                Nivel <span className="font-bold">5</span>
              </p>
              <button className="bg-white text-[#800020] font-semibold px-4 py-2 rounded-lg mt-2">
                Modificar perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
