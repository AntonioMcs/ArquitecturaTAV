"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Book } from "@/types";

interface BookDetailsProps {
  params: { id: string };
}

const BookDetails = ({ params }: BookDetailsProps) => {
  const { id } = params;
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/rutalibros/books/${id}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el libro");
        }
        const data: Book = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <p>Cargando libro...</p>;

  return (
    <>
      {/* Barra de navegación superior */}
      <div className="bg-red-600 p-4 fixed top-0 left-0 w-full z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-end space-x-4">
          <Link href="/login">
            <button className="bg-white text-red-600 px-6 py-2 rounded-lg hover:bg-red-100 transition-colors duration-300 font-medium">
              Iniciar Sesión
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-white text-red-600 px-6 py-2 rounded-lg hover:bg-red-100 transition-colors duration-300 font-medium">
              Registrarse
            </button>
          </Link>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto p-6 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imagen */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative w-full pb-[75%]">
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/img/${book.imagen_portada}`}
                alt={book.titulo}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Información del libro */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{book.titulo}</h2>
            
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Autor:</span> {book.autor}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Editorial:</span> {book.editorial || "Sin información"}
              </p>
              <p className="text-2xl text-red-600 font-bold my-6">
                ${book.precio}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Disponibilidad:</span> {book.stock} disponibles
              </p>

              {/* Botón de compra o acción principal */}
              <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg mt-8 hover:bg-red-700 transition-colors duration-300 font-medium">
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;