const express = require('express');
const router = express.Router();
const prisma = require('../prisma'); 
const upload = require('../middlewares/uploadImage');  // Importar el middleware de Multer para subida de imágenes

// Ruta para agregar un libro con imagen
router.post('/books', upload.single('imagen_portada'), async (req, res) => {
  const {
    titulo,
    autor,
    editorial,
    isbn,
    precio,
    stock,
    descripcion,
    id_categoria,
    peso,
    dimensiones,
    idioma,
    anio_edicion,
    fecha_publicacion,
  } = req.body;

  try {
    // Validaciones de campos obligatorios
    if (!titulo || !autor || !precio || !stock) {
      return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }

    // Obtener la ruta de la imagen cargada, si existe
    let imagen_portada = null;
    if (req.file) {
      imagen_portada = req.file.path; // Ruta de la imagen
    }

    // Crear el nuevo libro en la base de datos
    const nuevoLibro = await prisma.productos.create({
      data: {
        titulo,
        autor,
        editorial: editorial || null,
        isbn: isbn || null,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        descripcion: descripcion || null,
        id_categoria: id_categoria ? parseInt(id_categoria) : null,
        imagen_portada,
        peso: peso ? parseFloat(peso) : null,
        dimensiones: dimensiones || null,
        idioma: idioma || null,
        anio_edicion: anio_edicion ? parseInt(anio_edicion) : null,
        fecha_publicacion: fecha_publicacion ? new Date(fecha_publicacion) : null,
        fecha_registro: new Date(), // Fecha actual
      },
    });

    res.status(201).json({
      message: 'Libro agregado correctamente.',
      libro: nuevoLibro,
    });
  } catch (error) {
    console.error('Error al agregar el libro:', error);
    res.status(500).json({ message: 'Error al agregar el libro.', error });
  }
});

module.exports = router;
