const express = require('express');
const router = express.Router();
const prisma = require('../prisma'); // Prisma se importa para conectarse a la base de datos

// Ruta para obtener todos los libros
router.get('/books', async (_, res) => {
  try {
    const books = await prisma.productos.findMany(); // Consulta todos los libros en la base de datos
    res.status(200).json(books);
  } catch (error) {
    console.error('Error al obtener los libros:', error);
    res.status(500).json({ message: 'Error al obtener los libros' });
  }
});

// Ruta para obtener un libro por ID
router.get('/books/:id', async (req, res) => {
  const { id } = req.params; // Extrae el ID de los parámetros de la ruta
  try {
    const book = await prisma.productos.findUnique({
      where: { id_producto: parseInt(id) }, // Busca el libro por su ID
    });

    if (!book) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('Error al obtener el libro:', error);
    res.status(500).json({ message: 'Error al obtener el libro' });
  }
});



module.exports = router;
