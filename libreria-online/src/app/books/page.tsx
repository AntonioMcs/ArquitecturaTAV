"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Book } from "@/types";

const BooksList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/rutalibros/books`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los libros");
        }
        const data: Book[] = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <p>Cargando libros...</p>;

  return (
    <>
      {/* Barra de navegación superior */}
      <div className="bg-red-600 p-4 fixed top-0 left-0 w-full z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-end space-x-4">
          <Link href="/auth/login">
            <button className="bg-white text-red-600 px-6 py-2 rounded-lg hover:bg-red-100 transition-colors duration-300 font-medium">
              Iniciar Sesión
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="bg-white text-red-600 px-6 py-2 rounded-lg hover:bg-red-100 transition-colors duration-300 font-medium">
              Registrarse
            </button>
          </Link>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto p-6 pt-24">
        <h2 className="text-3xl font-bold mb-8">Catálogo de Libros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {books.map((book) => (
            <Link href={`/books/${book.id_producto}`} key={book.id_producto}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Contenedor de imagen con aspect ratio fijo */}
                <div className="relative w-full pb-[100%]">
                  {book.imagen_portada ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/img/${book.imagen_portada}`}
                      alt={book.titulo}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                      Sin Imagen
                    </div>
                  )}
                </div>
                
                {/* Información del libro */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[3.5rem]">
                    {book.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">
                    Autor: {book.autor}
                  </p>
                  <p className="text-red-600 font-bold mb-4">
                    ${book.precio}
                  </p>
                  <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-300">
                    Ver Detalles
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BooksList;