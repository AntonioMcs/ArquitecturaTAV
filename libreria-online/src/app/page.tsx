"use client";

import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-[#800020] text-white px-10 py-3 border-b border-b-[#ffcc00]">
      <div className="flex items-center gap-4">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
              fill="currentColor"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M39.998 12.236C39.9944 12.2537 ... (rest of the SVG path)"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
          Bookland
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/auth/login" className="bg-[#ffcc00] text-[#800020] px-4 py-2 rounded transition duration-300 hover:bg-[#e6b800] hover:text-white">
          Iniciar Sesión
        </Link>
        <Link href="/auth/register" className="bg-[#ffcc00] text-[#800020] px-4 py-2 rounded transition duration-300 hover:bg-[#e6b800] hover:text-white">
          Registrarse
        </Link>
        <Link href="/books" className="bg-[#ffcc00] text-[#800020] px-4 py-2 rounded transition duration-300 hover:bg-[#e6b800] hover:text-white">
          Catálogo de Libros
        </Link>
        <Link href="/" className="bg-[#ffcc00] text-[#800020] px-4 py-2 rounded transition duration-300 hover:bg-[#e6b800] hover:text-white">
          Inicio
        </Link>
        <Link href="/categories" className="bg-[#ffcc00] text-[#800020] px-4 py-2 rounded transition duration-300 hover:bg-[#e6b800] hover:text-white">
          Categorías
        </Link>
        <Link href="/contact" className="bg-[#ffcc00] text-[#800020] px-4 py-2 rounded transition duration-300 hover:bg-[#e6b800] hover:text-white">
          Contacto
        </Link>
        <Link href="/add-book" className="bg-[#ffcc00] text-[#800020] px-4 py-2 rounded transition duration-300 hover:bg-[#e6b800] hover:text-white">
          Añadir Libro
        </Link>
      </div>
    </header>
  );
};

export default Header;
