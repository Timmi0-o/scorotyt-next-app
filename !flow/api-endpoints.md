# API Endpoints Analysis - Skorotut

## 🔐 Авторизация

### SMS/Звонок верификация
```
POST /customer/sms-verification/send
POST /customer/sms-verification/sms/send
POST /customer/sms-verification/verify
POST /customer/login
```

### Telegram авторизация
```
GET /customer/auth/telegram
```

**Параметры авторизации:**
- `mobile` - номер телефона
- `country_code` - код страны
- `code` - код подтверждения
- `fcm_token` - токен для push уведомлений

## 👤 Пользователь

### Профиль
```
GET /customer/profile
POST /customer/profile/update
POST /customer/profile/image
```

### Адреса
```
GET /customer/addresses
POST /customer/addresses/add
PUT /customer/addresses/update/{id}
DELETE /customer/addresses/delete/{id}
```

### Города
```
GET /cities
GET /cities/{id}
```

## 🏪 Каталог

### Продавцы/Магазины
```
GET /sellers
GET /sellers/{id}
GET /sellers/{id}/products
```

### Продукты
```
GET /products
GET /products/{id}
GET /products/search
GET /categories
GET /categories/{id}/products
```

### Фильтрация и поиск
```
GET /products?category_id={id}
GET /products?seller_id={id}
GET /products?search={query}
GET /products?sort={type}
GET /products?limit={limit}&offset={offset}
```

## 🛒 Корзина и заказы

### Корзина
```
GET /customer/cart
POST /customer/cart/add
PUT /customer/cart/update
DELETE /customer/cart/remove
POST /customer/cart/clear
```

### Промокоды
```
GET /customer/promo-codes
POST /customer/promo-codes/validate
POST /customer/promo-codes/apply
```

### Заказы
```
GET /customer/orders
GET /customer/orders/{id}
POST /customer/orders/place
PUT /customer/orders/{id}/cancel
GET /customer/orders/active
```

### Платежи
```
POST /customer/payments/process
GET /customer/payments/methods
POST /customer/payments/webhook
```

## ❤️ Избранное

```
GET /customer/wishlist
POST /customer/wishlist/add
DELETE /customer/wishlist/remove/{id}
```

## 🔔 Уведомления

```
GET /customer/notifications
PUT /customer/notifications/{id}/read
POST /customer/notifications/settings
```

## 📊 Дополнительные эндпоинты

### Настройки приложения
```
GET /app/settings
GET /app/version
GET /app/maintenance
```

### Аналитика
```
POST /analytics/event
POST /analytics/page-view
```

## 🔧 Общие параметры

### Геолокация
- `latitude` - широта
- `longitude` - долгота
- `city_id` - ID города

### Пагинация
- `limit` - количество элементов (по умолчанию 20)
- `offset` - смещение (по умолчанию 0)

### Сортировка
- `sort` - тип сортировки (new, popular, price_asc, price_desc)

## 📝 Структура ответов

### Успешный ответ
```json
{
  "status": 1,
  "message": "Success",
  "data": {...},
  "total": 100
}
```

### Ошибка
```json
{
  "status": 0,
  "message": "Error message",
  "errors": {...}
}
```

## 🔑 Авторизация запросов

### Headers
```
Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json
```

### Telegram WebApp
```
X-Telegram-Init-Data: {initData}
X-Telegram-Hash: {hash}
```

## 🌐 Базовые URL

### Production
```
https://skorotut.kdigital.pro
```

### Development
```
https://dev.skorotut.kdigital.pro
``` 