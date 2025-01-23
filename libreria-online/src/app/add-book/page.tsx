'use client';

import React, { useState } from 'react';

const AddBookPage = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    editorial: '',
    isbn: '',
    precio: '',
    stock: '',
    descripcion: '',
    id_categoria: '',
    peso: '',
    dimensiones: '',
    idioma: '',
    anio_edicion: '',
    fecha_publicacion: '',
  });
  const [imagenPortada, setImagenPortada] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagenPortada(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    if (imagenPortada) {
      form.append('imagen_portada', imagenPortada);
    }

    try {
      const response = await fetch('/books/add', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        setSuccessMessage('Libro añadido exitosamente.');
        setFormData({
          titulo: '',
          autor: '',
          editorial: '',
          isbn: '',
          precio: '',
          stock: '',
          descripcion: '',
          id_categoria: '',
          peso: '',
          dimensiones: '',
          idioma: '',
          anio_edicion: '',
          fecha_publicacion: '',
        });
        setImagenPortada(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Hubo un problema al agregar el libro.');
      }
    } catch (err) {
      console.error('Error al enviar el formulario:', err);
      setError('Hubo un problema al conectar con el servidor.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Añadir Nuevo Libro</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={formData.titulo}
          onChange={handleChange}
          required
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="autor"
          placeholder="Autor"
          value={formData.autor}
          onChange={handleChange}
          required
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="editorial"
          placeholder="Editorial"
          value={formData.editorial}
          onChange={handleChange}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          required
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
          required
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
          className="block w-full p-2 border rounded mb-2"
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          required
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="id_categoria"
          placeholder="ID Categoría"
          value={formData.id_categoria}
          onChange={handleChange}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="peso"
          placeholder="Peso"
          value={formData.peso}
          onChange={handleChange}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="dimensiones"
          placeholder="Dimensiones"
          value={formData.dimensiones}
          onChange={handleChange}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="idioma"
          placeholder="Idioma"
          value={formData.idioma}
          onChange={handleChange}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="anio_edicion"
          placeholder="Año de Edición"
          value={formData.anio_edicion}
          onChange={handleChange}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="date"
          name="fecha_publicacion"
          placeholder="Fecha de Publicación"
          value={formData.fecha_publicacion}
          onChange={handleChange}
          className="block w-full p-2 border rounded mb-4"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        >
          Guardar Libro
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
