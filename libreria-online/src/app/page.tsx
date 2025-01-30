"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Book } from "@/types";

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

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`);
        if (!response.ok) throw new Error("Error al obtener los libros");
        const data: Book[] = await response.json();
        setBooks(data);
      } catch (error: unknown) {
        console.error("Error al cargar los datos:", error);
        setErrorMessage("Error al cargar los datos de los libros");
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto p-6 pt-24">
        <h1 className="text-3xl font-bold mb-6">Libros Añadidos</h1>
        {errorMessage && <p className="text-red-600 font-medium mb-4">{errorMessage}</p>}
        <div className="overflow-x-auto">
          <div className="flex space-x-4">
            {books.map((book) => (
              <Link key={book.id_producto} href={`/books/${book.id_producto}`} className="bg-white rounded-lg shadow-lg p-4 hover:bg-gray-100 transition duration-300 min-w-[200px]">
                <h3 className="text-lg font-semibold mb-2">{book.titulo}</h3>
                <p className="text-gray-600 text-sm mb-1">Autor: {book.autor}</p>
                <p className="text-red-600 font-bold mb-4">${book.precio}</p>
                <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-300">
                  Ver Detalles
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;