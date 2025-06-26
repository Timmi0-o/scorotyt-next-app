'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import Link from 'next/link';
import { useState } from 'react';

const mockVendor = {
  id: 1,
  name: 'Додо Пицца',
  rating: 4.8,
  deliveryTime: '30-45 мин',
  deliveryFee: 199,
  minOrder: 500,
  image: '🍕'
};

const mockProducts = [
  { id: 1, name: 'Пицца Маргарита', price: 450, description: 'Томатный соус, моцарелла, базилик', image: '🍕' },
  { id: 2, name: 'Пицца Пепперони', price: 520, description: 'Томатный соус, моцарелла, пепперони', image: '🍕' },
  { id: 3, name: 'Кола 0.5л', price: 120, description: 'Прохладительный напиток', image: '🥤' },
  { id: 4, name: 'Картофель фри', price: 180, description: 'Хрустящий картофель с солью', image: '🍟' },
  { id: 5, name: 'Цезарь с курицей', price: 320, description: 'Салат с курицей, сыром и соусом', image: '🥗' },
  { id: 6, name: 'Чизкейк', price: 250, description: 'Нежный десерт с ягодами', image: '🍰' },
];

export default function VendorPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{[key: number]: number}>({});

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const cartTotal = Object.entries(cart).reduce((sum, [productId, quantity]) => {
    const product = mockProducts.find(p => p.id === parseInt(productId));
    return sum + (product ? product.price * quantity : 0);
  }, 0);

  const cartItemsCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <main className="flex min-h-screen flex-col bg-background pb-20">
      {/* Шапка продавца */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between mb-2">
          <Link href="/categories" className="text-primary-foreground">
            ← Назад
          </Link>
          <span className="text-2xl">{mockVendor.image}</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-1">{mockVendor.name}</h1>
        <div className="flex items-center space-x-4 text-sm opacity-90">
          <span>⭐ {mockVendor.rating}</span>
          <span>🕒 {mockVendor.deliveryTime}</span>
          <span>🚚 {mockVendor.deliveryFee} ₽</span>
        </div>
        <p className="text-xs opacity-75 mt-1">
          Минимальный заказ: {mockVendor.minOrder} ₽
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Поиск */}
        <Input
          type="text"
          placeholder="Поиск блюд..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Товары */}
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-4xl">{product.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">{product.price} ₽</span>
                      <div className="flex items-center space-x-2">
                        {cart[product.id] ? (
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setCart(prev => ({
                                ...prev,
                                [product.id]: Math.max(0, (prev[product.id] || 0) - 1)
                              }))}
                              className="h-8 w-8 p-0"
                            >
                              -
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">
                              {cart[product.id]}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addToCart(product.id)}
                              className="h-8 w-8 p-0"
                            >
                              +
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => addToCart(product.id)}
                          >
                            В корзину
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Плавающая корзина */}
      {cartItemsCount > 0 && (
        <div className="fixed bottom-20 left-4 right-4">
          <Link href="/cart">
            <Card className="bg-primary text-primary-foreground shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>🛒</span>
                    <span className="font-medium">{cartItemsCount} товаров</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{cartTotal} ₽</span>
                    <span>→</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}
      
      {/* Навигация внизу */}
      <BottomNavigation />
    </main>
  );
} 