const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const bookRoutes = require('./routes/bookRoutes');

// Express app initialization
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Multer configuration
const storage = multer.diskStorage({
    destination: (_, _, cb) => {
        cb(null, 'uploads/');
    },
    filename: (_, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Database configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'datosbase'
});

// Database connection
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos');
    }
});

// Image upload route
app.post('/upload', upload.single('image'), (req, res) => {
    const bookId = req.body.bookId;
    const imageUrl = req.file.path;

    const query = 'UPDATE productos SET imagen_portada = ? WHERE id_producto = ?';
    db.query(query, [imageUrl, bookId], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al guardar la imagen en la base de datos' });
        }
        res.json({ message: 'Imagen subida exitosamente', imageUrl });
    });
});

// Books routes
app.post('/books/add', (req, res) => {
    const { titulo, autor, editorial, precio, stock, descripcion, id_categoria } = req.body;

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
            return res.status(500).json({ message: 'Error al añadir el libro', error: err.message });
        }
        res.status(201).json({ message: 'Libro añadido con éxito', id: result.insertId });
    });
});

app.get('/books', (_, res) => {
    const query = 'SELECT * FROM productos';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener la lista de libros' });
        }
        res.json(results);
    });
});

// Comments routes
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

app.post('/api/books/:id/comments/anonymous', (req, res) => {
    const bookId = req.params.id;
    const { comentario } = req.body;

    if (!comentario?.trim()) {
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});