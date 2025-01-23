require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Importar rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var profileRouter = require('./routes/profile');
var bookRouter = require('./routes/bookRoutes');

var app = express();

// Configuración de CORS
app.use(cors({
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000', // URL de frontend (ajustar según el entorno)
    credentials: true, 
}));

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas estáticas para imágenes
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// Configuración de rutas
app.use('/', indexRouter);               // Rutas principales
app.use('/users', usersRouter);          // Rutas de usuarios
app.use('/auth', authRouter);            // Rutas de autenticación
app.use('/api/profile', profileRouter);  // Perfil del usuario
app.use('/api/books', bookRouter);       // Rutas para libros (ajustada la ruta base)

// Exportar la instancia de la app
module.exports = app;
