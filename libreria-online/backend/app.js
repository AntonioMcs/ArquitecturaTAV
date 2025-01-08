require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth'); 
var profileRouter = require('./routes/profile');
var bookRouter = require('./routes/bookRoutes'); // Importar la nueva ruta
const bookRoutes = require('./routes/bookRoutes'); // Ajusta el nombre si tu archivo tiene otro nombre

var app = express();

// Configuración de CORS
app.use(cors({
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
    credentials: true, 
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter); 
app.use('/api/profile', profileRouter);
app.use('/', bookRouter); // Añadir las rutas del catálogo de libros
app.use('/rutalibros', bookRoutes);


module.exports = app;
