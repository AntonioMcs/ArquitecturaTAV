"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Book } from "@/types";

const BooksList = () => {
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
      <div className="max-w-7xl mx-auto p-6 pt-24">
        <h1 className="text-3xl font-bold mb-6">Catálogo de Libros</h1>
        {errorMessage && <p className="text-red-600 font-medium mb-4">{errorMessage}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Link key={book.id_producto} href={`/books/${book.id_producto}`}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {book.imagen_portada && (
                  <div className="relative h-64">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${book.imagen_portada}`}
                      alt={book.titulo}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
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