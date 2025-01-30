"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Book } from "@/types";

interface BookDetailsProps {
  params: { id: string };
}

interface Comment {
  id_comentario: string;
  comentario: string;
  fecha_comentario: string;
}

const BookDetails = ({ params }: BookDetailsProps) => {
  const { id } = params;
  const [book, setBook] = useState<Book | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`);
        if (!response.ok) throw new Error("Error al obtener el libro");
        const data: Book = await response.json();
        setBook(data);
      } catch (error: unknown) {
        console.error("Error al cargar los datos:", error);
        setErrorMessage("Error al cargar los datos del libro");
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}/comments`);
        if (!response.ok) throw new Error("Error al obtener comentarios");
        const data: Comment[] = await response.json();
        setComments(data);
      } catch (error: unknown) {
        console.error("Error al obtener los comentarios:", error);
        setErrorMessage("Error al cargar los comentarios");
      }
    };

    fetchBook();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      setErrorMessage("El comentario no puede estar vacío.");
      return;
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}/comments/anonymous`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comentario: newComment }),
      });
  
      if (!response.ok) {
        throw new Error('Error al publicar comentario');
      }
  
      const addedComment = await response.json();
      setComments([addedComment, ...comments]);
      setNewComment('');
      setErrorMessage(null);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error al publicar el comentario');
    }
  };

  if (!book) return <p>Cargando libro...</p>;

  return (
    <>
      {/* Barra de navegación */}
      <nav className="bg-red-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-lg font-semibold">
            Inicio
          </Link>
          <div>
            <Link href="/auth/login" className="text-red-600 bg-white border border-red-600 py-2 px-4 rounded-lg mr-4 hover:bg-red-100 transition-colors duration-300">
              Iniciar Sesión
            </Link>
            <Link href="/auth/register" className="text-red-600 bg-white border border-red-600 py-2 px-4 rounded-lg hover:bg-red-100 transition-colors duration-300">
              Registrarse
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {book.imagen_portada && (
              <div className="relative">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${book.imagen_portada}`}
                  alt={book.titulo}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{book.titulo}</h2>
            <p className="text-lg text-gray-700 mb-4">{book.descripcion}</p>
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Autor:</span> {book.autor}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Editorial:</span> {book.editorial || "Sin información"}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Fecha de Publicación:</span> {book.fecha_publicacion ? new Date(book.fecha_publicacion).toLocaleDateString() : "Sin información"}
              </p>
              <p className="text-2xl text-red-600 font-bold my-6">
                ${book.precio}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Disponibilidad:</span> {book.stock} disponibles
              </p>
              <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg mt-8 hover:bg-red-700 transition-colors duration-300 font-medium">
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>

        {/* Sección de Comentarios */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-2xl font-semibold mb-4">Comentarios Anónimos</h3>

          {/* Caja de comentarios */}
          <div className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 mt-2"
              rows={3}
              placeholder="Escribe un comentario..."
            />
            {errorMessage && <p className="text-red-600 font-medium mt-2">{errorMessage}</p>}
            <button
              onClick={handleCommentSubmit}
              className="bg-red-600 text-white py-2 px-4 mt-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Publicar Comentario
            </button>
          </div>

          {/* Lista de comentarios */}
          <div>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id_comentario} className="bg-gray-100 p-4 rounded-lg mb-3">
                  <p className="text-gray-700">{comment.comentario}</p>
                  <p className="text-sm text-gray-500">{new Date(comment.fecha_comentario).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Aún no hay comentarios.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};


export default BookDetails;