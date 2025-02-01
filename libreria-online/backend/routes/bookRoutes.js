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
// Ruta para obtener comentarios
router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await prisma.$queryRaw`
      SELECT id_comentario, id_producto, comentario, fecha_comentario 
      FROM comentarioanonimo 
      WHERE id_producto = ${parseInt(id)}
      ORDER BY fecha_comentario DESC
    `;
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error al obtener comentarios' });
  }
});

// Ruta para agregar comentario anónimo
router.post('/:id/comments/anonymous', async (req, res) => {
  const { id } = req.params;
  const { comentario } = req.body;

  if (!comentario?.trim()) {
    return res.status(400).json({ message: 'El comentario no puede estar vacío.' });
  }

  try {
    // Insertar comentario
    await prisma.$queryRaw`
      INSERT INTO comentarioanonimo (id_producto, comentario, fecha_comentario)
      VALUES (${parseInt(id)}, ${comentario.trim()}, NOW())
    `;

    // Obtener el comentario recién insertado
    const [insertedComment] = await prisma.$queryRaw`
      SELECT id_comentario, id_producto, comentario, fecha_comentario
      FROM comentarioanonimo
      WHERE id_comentario = LAST_INSERT_ID()
    `;

    if (!insertedComment) {
      throw new Error('Error al recuperar el comentario insertado');
    }

    res.status(201).json(insertedComment);
  } catch (error) {
    console.error('Error al añadir comentario:', error);
    res.status(500).json({ message: 'Error al añadir comentario' });
  }
});

module.exports = router;