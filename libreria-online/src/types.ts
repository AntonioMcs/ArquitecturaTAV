// src/types.ts
export interface Book {
  id_producto: number;
  titulo: string;
  autor: string;
  editorial?: string;
  isbn?: string;
  precio: number;
  stock: number;
  descripcion?: string;
  id_categoria?: number;
  imagen_portada?: string;
  peso?: number;
  dimensiones?: string;
  idioma?: string;
  anio_edicion?: number;
  fecha_publicacion?: string;
}
