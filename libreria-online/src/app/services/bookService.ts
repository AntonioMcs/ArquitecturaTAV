export const addBook = async (bookData: {
    titulo: string;
    autor: string;
    editorial?: string;
    precio: number;
    stock: number;
    descripcion?: string;
    id_categoria: number;
    imagen_portada?: string;
  }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });
  
      if (!response.ok) {
        throw new Error('Error al añadir el libro');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error en el servicio de añadir libro:', error);
      throw error;
    }
  };
  