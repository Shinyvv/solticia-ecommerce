export type Product = {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagenes: string[];
  tallas: string[];
  disponible: boolean;
  visible: boolean;
  destacado: boolean;
  createdAt: string | Date;
};
