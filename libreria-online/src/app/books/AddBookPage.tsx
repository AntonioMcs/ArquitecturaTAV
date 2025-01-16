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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagenPortada(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (imagenPortada) {
      data.append('imagen_portada', imagenPortada);
    }

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        alert('Libro agregado correctamente.');
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
        alert(result.message || 'Error al agregar el libro.');
      }
    } catch (error) {
      console.error(error);
      alert('Error al enviar el formulario.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Agregar un nuevo libro</h2>

      <div className="mb-3">
        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="mb-3">
        <label>Autor:</label>
        <input
          type="text"
          name="autor"
          value={formData.autor}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* Agrega los demás campos como el ejemplo anterior */}
      {/* Campo para cargar la imagen */}
      <div className="mb-3">
        <label>Imagen de portada:</label>
        <input type="file" onChange={handleFileChange} className="w-full border p-2 rounded" />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Subir
      </button>
    </form>
  );
};

export default AddBookPage;
