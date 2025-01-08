var express = require('express');
var router = express.Router();
const bookRoutes = require('../routes/bookRoutes'); // Importa tus rutas de la API

/* GET home page. */
router.get('/', function (_req, res) {
  res.render('index', { title: 'Express' });
});

// Integrar las rutas de la API (por ejemplo, /api/books, /api/categories)
router.use('/rutalibros', bookRoutes);

module.exports = router;
