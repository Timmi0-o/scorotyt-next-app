// Интерфейс товара
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  inStock: boolean;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

// Интерфейс ответа API с пагинацией
export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Интерфейс для запроса при добавлении товара в корзину
export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

// Интерфейс для детальной информации о товаре
export interface ProductDetails extends Product {
  features?: string[];
  specifications?: Record<string, string>;
  relatedProducts?: Product[];
} 