"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Book } from "@/types";

interface BookDetailsProps {
  params: { id: string };
}

interface Comment {
  id: number;
  author: string;
  content: string;
}

const BookDetails = ({ params }: BookDetailsProps) => {
  const { id } = params;
  const [book, setBook] = useState<Book | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  useEffect(() => {
    // Fetch book details
    const fetchBook = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/rutalibros/books/${id}`
      );
      const data = await response.json();
      setBook(data);
    };
    fetchBook();
  }, [id]);

  // Handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() === "" || author.trim() === "") return;

    const newCommentData: Comment = {
      id: comments.length + 1,
      author: author,
      content: newComment,
    };

    setComments([...comments, newCommentData]);
    setNewComment(""); // Clear the comment input
    setAuthor(""); // Clear the author input
  };

  if (!book) return <p>Cargando libro...</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Imagen */}
        <div className="relative">
          <Image
            src={book.imagen_portada || "/placeholder.jpg"}
            alt={book.titulo}
            width={400}
            height={600}
            className="object-cover rounded-lg shadow-md"
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
            <strong>ISBN:</strong> {book.isbn || "No disponible"}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Precio:</strong> ${book.precio}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Disponibilidad:</strong> {book.stock} disponibles
          </p>
        </div>
      </div>

      {/* Descripción */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800">Descripción</h3>
        <p className="text-gray-600 mt-4">{book.descripcion || "No disponible"}</p>
      </div>

      {/* Sección de comentarios */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Comentarios</h3>

        {/* Lista de comentarios */}
        {comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <p className="font-bold text-gray-700">{comment.author}:</p>
                <p className="text-gray-600 mt-1">{comment.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay comentarios aún. ¡Sé el primero en comentar!</p>
        )}

        {/* Formulario de comentario */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Tu nombre"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <textarea
            placeholder="Escribe tu comentario aquí..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="w-full p-2 border rounded"
          ></textarea>
          <button
            onClick={handleAddComment}
            className="mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Enviar comentario
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
