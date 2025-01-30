const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const path = require('path');

// Ruta para obtener todos los libros
router.get('/', async (_, res) => {
  try {
    const books = await prisma.productos.findMany();

    const booksWithImageUrls = books.map((book) => ({
      ...book,
      imagen_portada: book.imagen_portada ? `/img/${path.basename(book.imagen_portada)}` : null,
    }));

    res.status(200).json(booksWithImageUrls);
  } catch (error) {
    console.error('Error al obtener los libros:', error);
    res.status(500).json({ message: 'Error al obtener los libros' });
  }
});

// Ruta para obtener un libro por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await prisma.productos.findUnique({
      where: { id_producto: parseInt(id) },
    });

    if (!book) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    const bookWithImageUrl = {
      ...book,
      imagen_portada: book.imagen_portada ? `/img/${path.basename(book.imagen_portada)}` : null,
    };

    res.status(200).json(bookWithImageUrl);
  } catch (error) {
    console.error('Error al obtener el libro:', error);
    res.status(500).json({ message: 'Error al obtener el libro' });
  }
});

// Ruta para obtener comentarios de un libro por ID
router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await prisma.comentariosAnonimos.findMany({
      where: { id_producto: parseInt(id) },
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    res.status(500).json({ message: 'Error al obtener los comentarios' });
  }
});

// Ruta para agregar un comentario anónimo
router.post('/:id/comments/anonymous', async (req, res) => {
  const { id } = req.params;
  const { comentario } = req.body;

  if (!comentario.trim()) {
    return res.status(400).json({ message: 'El comentario no puede estar vacío.' });
  }

  try {
    const newComment = await prisma.comentariosAnonimos.create({
      data: {
        id_producto: parseInt(id),
        comentario,
      },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error al añadir comentario anónimo:', error); // Log de error
    res.status(500).json({ 
      message: 'No se pudo publicar el comentario anónimo.', 
      error: error.message 
    });
  }
});

module.exports = router;