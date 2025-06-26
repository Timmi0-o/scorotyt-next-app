# API Actions

Новая архитектура API на основе абстрактных экшенов для лучшей организации и кеширования.

## Структура

### Типы и интерфейсы

- `types/api.types.ts` - Типы данных API с приставкой I (ISeller, IProduct, и т.д.)
- `types/action-options.ts` - Типы для экшенов

### Константы и конфигурация

- `data/constants.data.ts` - HTTP методы и настройки кеширования
- `data/endpoint.data.ts` - URL эндпоинты для всех API

### Утилиты

- `utils/api-transformers.ts` - Функции трансформации данных API
- `utils/mock-data.ts` - Mock данные для fallback

### Абстрактные экшены

- `helpers/abstract-action.action.ts` - Базовый GET экшен
- `helpers/abstract-mutate-action.action.ts` - Базовый POST/PUT/DELETE экшен
- `helpers/api-wrapper.ts` - Обертка для fetch с авторизацией

### Экшены по доменам

- `home.actions.ts` - Главная страница
- `sellers.actions.ts` - Продавцы и их товары
- `products.actions.ts` - Поиск и детали товаров
- `cart.actions.ts` - Корзина покупок
- `orders.actions.ts` - Заказы

### API клиент

- `lib/api-client.ts` - Главный API клиент, использующий экшены

## Использование

### Прямое использование экшенов

```typescript
import { homeGet, sellersGet, productsSearch } from '@/actions'

// Получить данные главной страницы
const homeData = await homeGet({
	latitude: 55.7558,
	longitude: 37.6176,
	sort: 'new',
})

// Получить продавцов
const sellers = await sellersGet({ limit: 20 })

// Поиск товаров
const searchResults = await productsSearch({
	query: 'пицца',
	page: 1,
	limit: 10,
})
```

### Использование через API клиент

```typescript
import { homeApi, sellersApi, cartApi } from '@/lib/api-client'

// Получить данные главной страницы с обработкой ошибок
const homeData = await homeApi.getHomeData()

// Добавить товар в корзину
await cartApi.addToCart(123, 2)
```

### Типизированные интерфейсы

```typescript
import { ISeller, IProduct, ITransformedSeller } from '@/types/api.types'

// Все типы с приставкой I для единообразия
const seller: ISeller = {
	id: 1,
	store_name: 'Test Store',
	// ...
}

const transformedSeller: ITransformedSeller = transformSeller(seller)
```

### POST/PUT/DELETE запросы

```typescript
import { cartAddItem, cartUpdateItem, cartRemoveItem } from '@/actions'

// Добавить товар в корзину
await cartAddItem({
	productId: 123,
	quantity: 2,
})

// Обновить количество
await cartUpdateItem({
	itemId: 456,
	quantity: 1,
})

// Удалить из корзины
await cartRemoveItem(456)
```

## Кеширование

Каждый экшен автоматически использует Next.js кеширование:

```typescript
// Настройки в constants.data.ts
export const TAGS = {
	HOME: {
		tags: ['home'],
		revalidate: 300, // 5 минут
	},
	SELLERS: {
		tags: ['sellers'],
		revalidate: 600, // 10 минут
	},
	// ...
}
```

## Обработка ошибок

Все экшены возвращают объект с полем `error` при ошибке:

```typescript
const result = await homeGet()

if ('error' in result) {
	console.error('API Error:', result.error)
	// Fallback логика
} else {
	const data = result.data
	// Работа с данными
}
```

## Валидация и типы

Все экшены типизированы и включают валидацию параметров:

```typescript
// TypeScript автоматически проверит типы
const result = await productsSearch({
	query: 'pizza', // ✅ строка
	page: 1, // ✅ число
	limit: 10, // ✅ число
})
```

## Миграция с старого API

```typescript
// Старый способ
// import { getHomePageData } from '@/lib/api'

// Новый способ
import { getHomePageData } from '@/lib/api-client'
// или
import { homeGet } from '@/actions'
```

## Структура файлов

```
src/
├── actions/
│   ├── data/
│   │   ├── constants.data.ts
│   │   └── endpoint.data.ts
│   ├── helpers/
│   │   ├── abstract-action.action.ts
│   │   ├── abstract-mutate-action.action.ts
│   │   └── api-wrapper.ts
│   ├── home.actions.ts
│   ├── sellers.actions.ts
│   ├── products.actions.ts
│   ├── cart.actions.ts
│   ├── orders.actions.ts
│   └── index.ts
├── types/
│   ├── api.types.ts
│   └── action-options.ts
├── utils/
│   ├── api-transformers.ts
│   └── mock-data.ts
└── lib/
    └── api-client.ts
```
