// Importación de los módulos necesarios
const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');

// Creación de la aplicación Express
const app = express();

// Configuración de multer para subir archivos
const storage = multer.diskStorage({
    destination: (_, _, cb) => {
        cb(null, 'uploads/');
    },
    filename: (_, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
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

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});