import type { Product, ProductDto } from '../types/product';

export const toProduct = (dto: ProductDto): Product => ({
  id: dto.id,
  nombre: dto.title.trim(),
  imagen: dto.image?.replace('http://', 'https://') ?? '',
  precio: dto.price,
  categoria: dto.category,
  descripcion: dto.description,
});