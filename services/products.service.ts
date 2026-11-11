import axios from 'axios';
import { toProduct } from '../mappers/product.mapper';
import type { Product, ProductDto } from '../types/product';

const api = axios.create({ baseURL: 'https://fakestoreapi.com', timeout: 8000 });

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<ProductDto[]>('/products');
  return data.map(toProduct); 
}
