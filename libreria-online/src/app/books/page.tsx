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
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Catálogo de Libros</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link href={`/books/${book.id_producto}`} key={book.id_producto}>
            <div className="relative flex flex-col rounded-xl bg-gradient-to-br from-white to-gray-50 bg-clip-border text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div
                className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-red-500 bg-clip-border shadow-lg group"
              >
                <img
  src={`http://localhost:3001/img/${book.imagen_portada}`} // Usa directamente la URL completa para descartar problemas
  alt={book.titulo}
  className="h-40 w-full object-cover"
/>

              </div>
              <div className="p-6">
                <h3 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-900 antialiased group-hover:text-red-600 transition-colors duration-300">
                  {book.titulo}
                </h3>
                <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
                  Autor: {book.autor}
                </p>
                <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
                  Precio: ${book.precio}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BooksList;
