import { useState, useEffect } from 'react';
import apiClient from '@/app/services/apiClient'; // Conecta tu configuración de Axios

// Definición de la interfaz del libro
export interface Book {
  id_producto: number;
  titulo: string;
  autor: string;
  editorial?: string;
  precio: number;
  descripcion?: string;
  imagen_portada?: string;
}

// Custom hook para manejar libros
export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener todos los libros
  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/rutalibros/books');
      setBooks(response.data);
    } catch (err: any) {
      console.error('Error al obtener los libros:', err);
      setError('Error al obtener los libros');
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener un libro por ID
  const fetchBookById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/rutalibros/books/${id}`);
      setBook(response.data);
    } catch (err: any) {
      console.error('Error al obtener el libro:', err);
      setError('Error al obtener el libro');
    } finally {
      setLoading(false);
    }
  };

  return {
    books,
    book,
    loading,
    error,
    fetchBooks,
    fetchBookById,
  };
};
