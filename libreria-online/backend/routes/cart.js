// backend/routes/cart.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener el carrito de un usuario
exports.getCart = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const cartItems = await prisma.carrito_compras.findMany({
      where: { id_usuario: parseInt(id_usuario) },
      include: { productos: true },
    });

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar un producto al carrito
exports.addToCart = async (req, res) => {
  const { id_usuario, id_producto, cantidad } = req.body;

  try {
    // Verificar si el producto ya está en el carrito
    const existingItem = await prisma.carrito_compras.findFirst({
      where: { id_usuario, id_producto },
    });

    if (existingItem) {
      // Actualizar la cantidad si ya existe
      const updatedItem = await prisma.carrito_compras.update({
        where: { id_carrito: existingItem.id_carrito },
        data: { cantidad: existingItem.cantidad + cantidad },
      });
      return res.status(200).json(updatedItem);
    } else {
      // Crear un nuevo ítem en el carrito
      const newItem = await prisma.carrito_compras.create({
        data: { id_usuario, id_producto, cantidad },
      });
      res.status(201).json(newItem);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un producto del carrito
exports.removeFromCart = async (req, res) => {
  const { id_carrito } = req.params;

  try {
    await prisma.carrito_compras.delete({ where: { id_carrito: parseInt(id_carrito) } });
    res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar la cantidad de un producto en el carrito
exports.updateCartItem = async (req, res) => {
  const { id_carrito, cantidad } = req.body;

  try {
    const updatedItem = await prisma.carrito_compras.update({
      where: { id_carrito: parseInt(id_carrito) },
      data: { cantidad },
    });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
