"use client";

import { useEffect, useState } from "react";

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
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Imagen */}
        <div className="relative">
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/img/${book.imagen_portada}`}
            alt={book.titulo}
            className="h-40 w-full object-cover"
          />
        </div>

        {/* Información del libro */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{book.titulo}</h2>
          <p className="text-lg text-gray-600">
            <strong>Autor:</strong> {book.autor}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Editorial:</strong> {book.editorial || "Sin información"}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Precio:</strong> ${book.precio}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Disponibilidad:</strong> {book.stock} disponibles
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;