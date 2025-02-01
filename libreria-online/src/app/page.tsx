"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Book } from "@/types";

const navLinks = [
  { text: 'Iniciar Sesión', path: '/auth/login' },
  { text: 'Registrarse', path: '/auth/register' },
  { text: 'Catálogo de Libros', path: '/books' },
  { text: 'Inicio', path: '/' },
  { text: 'Categorías', path: '/categories' },
  { text: 'Contacto', path: '/contact' },
  { text: 'Añadir Libro', path: '/add-book' }
];

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-[#800020] text-white px-10 py-3 border-b border-b-[#ffcc00]">
      <div className="flex items-center gap-4">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Bookland</h2>
      </div>
      <div className="flex items-center gap-4">
        {navLinks.map(({ text, path }) => (
          <Link 
            key={text} 
            href={path}
            className="relative px-6 py-2 bg-[#800020] text-white font-semibold rounded-lg border-2 border-[#ffcc00] hover:border-[#e6b800] transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(255,204,0,0.3)] active:scale-95 group"
          >
            <span className="flex items-center space-x-2">
              <span>{text}</span>
            </span>
            <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#ffcc00]/20 to-[#e6b800]/20"/>
          </Link>
        ))}
      </div>
    </header>
  );
};

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;

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

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8">Libros Añadidos</h1>
        {errorMessage && <p className="text-red-600 font-medium mb-4">{errorMessage}</p>}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentBooks.map((book) => (
            <Link 
              key={book.id_producto} 
              href={`/books/${book.id_producto}`}
              className="group block h-full"
            >
              <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{book.titulo}</h3>
                  <p className="text-gray-600 text-sm mb-2">Autor: {book.autor}</p>
                </div>
                <div>
                  <p className="text-red-600 font-bold mb-4">${book.precio}</p>
                  <button className="relative w-full px-6 py-2 bg-[#800020] text-white font-semibold rounded-lg border-2 border-[#ffcc00] hover:border-[#e6b800] transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(255,204,0,0.3)] active:scale-95 group">
                    <span className="flex items-center justify-center space-x-2">
                      <span>Ver Detalles</span>
                    </span>
                    <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#ffcc00]/20 to-[#e6b800]/20"/>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="relative px-6 py-2 bg-[#800020] text-white font-semibold rounded-lg border-2 border-[#ffcc00] hover:border-[#e6b800] transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(255,204,0,0.3)] active:scale-95 disabled:opacity-50 disabled:hover:shadow-none group"
          >
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                className="w-5 h-5 text-[#ffcc00] group-hover:text-white transition-colors duration-300"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              <span>Anterior</span>
            </span>
            <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#ffcc00]/20 to-[#e6b800]/20"/>
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`relative px-4 py-2 font-semibold rounded-lg border-2 transition-all duration-300 active:scale-95 group ${
                currentPage === i + 1 
                  ? 'bg-[#800020] text-white border-[#ffcc00]' 
                  : 'bg-[#ffcc00] text-[#800020] border-[#800020] hover:shadow-[0_0_20px_10px_rgba(128,0,32,0.3)]'
              }`}
            >
              <span>{i + 1}</span>
              <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#800020]/20 to-[#600018]/20"/>
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="relative px-6 py-2 bg-[#800020] text-white font-semibold rounded-lg border-2 border-[#ffcc00] hover:border-[#e6b800] transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(255,204,0,0.3)] active:scale-95 disabled:opacity-50 disabled:hover:shadow-none group"
          >
            <span className="flex items-center space-x-2">
              <span>Siguiente</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                className="w-5 h-5 text-[#ffcc00] group-hover:text-white transition-colors duration-300"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#ffcc00]/20 to-[#e6b800]/20"/>
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;