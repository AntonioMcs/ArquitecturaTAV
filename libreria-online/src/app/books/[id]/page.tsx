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

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return null;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${imagePath.replace(/\\/g, '/')}`;
  };

  if (!book) return <p>Cargando libro...</p>;

  return (
    <>
      {/* Barra de navegación */}
      <nav className="bg-[#800020] py-2.5 border-b border-[#ffcc00] fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center h-12">
          <Link 
            href="/" 
            className="relative px-4 py-1.5 bg-[#800020] text-white font-semibold rounded-lg border-2 border-[#ffcc00] hover:border-[#e6b800] transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(255,204,0,0.3)] active:scale-95 group"
          >
            <span className="flex items-center space-x-2">
              <span className="hidden sm:inline">Inicio</span>
              <span className="sm:hidden">Home</span>
            </span>
            <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#ffcc00]/20 to-[#e6b800]/20"/>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link 
              href="/auth/login"
              className="relative px-3 sm:px-4 py-1.5 bg-[#800020] text-white font-semibold rounded-lg border-2 border-[#ffcc00] hover:border-[#e6b800] transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(255,204,0,0.3)] active:scale-95 group text-sm sm:text-base"
            >
              <span className="flex items-center justify-center space-x-1">
                <span className="hidden sm:inline">Iniciar Sesión</span>
                <span className="sm:hidden">Login</span>
              </span>
              <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#ffcc00]/20 to-[#e6b800]/20"/>
            </Link>
            <Link 
              href="/auth/register"
              className="relative px-3 sm:px-4 py-1.5 bg-[#800020] text-white font-semibold rounded-lg border-2 border-[#ffcc00] hover:border-[#e6b800] transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(255,204,0,0.3)] active:scale-95 group text-sm sm:text-base"
            >
              <span className="flex items-center justify-center space-x-1">
                <span className="hidden sm:inline">Registrarse</span>
                <span className="sm:hidden">Register</span>
              </span>
              <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#ffcc00]/20 to-[#e6b800]/20"/>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {book.imagen_portada && (
              <div className="relative h-[500px]">
                <img
                  src={getImageUrl(book.imagen_portada)}
                  alt={book.titulo}
                  className="w-full h-full object-contain"
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
              <p className="text-2xl text-[#800020] font-bold my-6">
                ${book.precio}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Disponibilidad:</span> {book.stock} disponibles
              </p>
              <button className="relative w-full px-6 py-3 bg-[#800020] text-white font-semibold rounded-lg border-2 border-[#ffcc00] hover:border-[#e6b800] transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(255,204,0,0.3)] active:scale-95 group">
                <span className="flex items-center justify-center space-x-2">
                  <span>Agregar al Carrito</span>
                </span>
                <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#ffcc00]/20 to-[#e6b800]/20"/>
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
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] mt-2"
              rows={3}
              placeholder="Escribe un comentario..."
            />
            {errorMessage && <p className="text-[#800020] font-medium mt-2">{errorMessage}</p>}
            <button
              onClick={handleCommentSubmit}
              className="relative px-6 py-2 bg-[#800020] text-white font-semibold rounded-lg border-2 border-[#ffcc00] hover:border-[#e6b800] transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(255,204,0,0.3)] active:scale-95 group mt-2"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Publicar Comentario</span>
              </span>
              <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#ffcc00]/20 to-[#e6b800]/20"/>
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