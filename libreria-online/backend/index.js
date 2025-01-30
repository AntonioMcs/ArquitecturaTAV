// Importación de los módulos necesarios
const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const _prisma = require('./prismaClient');

// Creación de la aplicación Express
const app = express();

// Configuración de multer para subir archivos
const storage = multer.diskStorage({
    destination: (_, _, cb) => {
        cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
    },
    filename: (_, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para cada archivo
    }
});

const upload = multer({ storage: storage });

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'datosbase'
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos');
    }
});

// Middleware para parsear JSON
app.use(express.json());

// Ruta para subir la imagen y asociarla a un libro
app.post('/upload', upload.single('image'), (req, res) => {
    const bookId = req.body.bookId;
    const imageUrl = req.file.path;

    const query = 'UPDATE productos SET imagen_portada = ? WHERE id_producto = ?';
    db.query(query, [imageUrl, bookId], (err, _result) => {  // Prefijar 'result' con '_'
        if (err) {
            return res.status(500).send('Error al guardar la imagen en la base de datos');
        }
        res.send(`Imagen subida y asociada al libro con ID: ${bookId}`);
    });
});

// Ruta para agregar un libro
app.post('/books/add', (req, res) => {
    const { titulo, autor, editorial, precio, stock, descripcion, id_categoria } = req.body;

    // Validar los campos obligatorios
    if (!titulo || !autor || !precio || !stock || !id_categoria) {
        return res.status(400).json({ message: 'Todos los campos requeridos deben ser llenados.' });
    }

    const query = `
        INSERT INTO productos (titulo, autor, editorial, precio, stock, descripcion, id_categoria)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [titulo, autor, editorial, precio, stock, descripcion, id_categoria];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al añadir libro:', err);
            return res.status(500).json({ message: 'Hubo un problema al añadir el libro.', error: err });
        }
        res.status(201).json({ message: 'Libro añadido con éxito', id: result.insertId });
    });
});

// Ruta para obtener la lista de libros
app.get('/books', (_, res) => {
    const query = 'SELECT * FROM productos';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Error al obtener la lista de libros');
        }
        res.json(results);
    });
});

// Configuración de la conexión a la base de datos para comentarios
db.changeUser({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}, (err) => {
    if (err) {
        console.error('Error al cambiar la configuración de la base de datos:', err);
    } else {
        console.log('Configuración de la base de datos cambiada');
    }
});

// Ruta para obtener comentarios
app.get('/api/books/:id/comments', (req, res) => {
    const bookId = req.params.id;
    const query = `
        SELECT id_comentario, id_producto, comentario, fecha_comentario 
        FROM comentarioanonimo 
        WHERE id_producto = ? 
        ORDER BY fecha_comentario DESC
    `;

    db.query(query, [bookId], (err, results) => {
        if (err) {
            console.error('Error al obtener comentarios:', err);
            return res.status(500).json({ message: 'Error al obtener comentarios' });
        }
        res.json(results);
    });
});

// Ruta para agregar comentario
app.post('/api/books/:id/comments/anonymous', (req, res) => {
    const bookId = req.params.id;
    const { comentario } = req.body;

    if (!comentario || comentario.trim() === '') {
        return res.status(400).json({ message: 'El comentario no puede estar vacío.' });
    }

    const query = `
        INSERT INTO comentarioanonimo (id_producto, comentario, fecha_comentario) 
        VALUES (?, ?, NOW())
    `;

    db.query(query, [bookId, comentario], (err, result) => {
        if (err) {
            console.error('Error al añadir comentario:', err);
            return res.status(500).json({ message: 'Error al añadir comentario' });
        }

        const newComment = {
            id_comentario: result.insertId,
            id_producto: parseInt(bookId),
            comentario: comentario,
            fecha_comentario: new Date()
        };

        res.status(201).json(newComment);
    });
});
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
