# Миграция на новую архитектуру API

## 🎯 Что изменилось

- ❌ Удалены `src/lib/api.ts` и `src/lib/api-v2.ts`
- ✅ Добавлен `src/lib/api-client.ts` - новый главный API клиент
- ✅ Типы перенесены в `src/types/api.types.ts` с приставкой `I`
- ✅ Утилиты вынесены в отдельные файлы
- ✅ Actions организованы по доменам

## 🔄 Быстрая миграция

### Импорты API

```typescript
// ❌ Было
import { getHomePageData, homeApi, sellersApi } from '@/lib/api'

// ✅ Стало
import { getHomePageData, homeApi, sellersApi } from '@/lib/api-client'
```

### Импорты типов

```typescript
// ❌ Было
import { ApiSeller, ApiProduct, ApiCategory } from '@/lib/api'

// ✅ Стало
import { ISeller, IProduct, ICategory } from '@/types/api.types'
```

### Импорты утилит

```typescript
// ❌ Было
import { transformSeller, processImageUrl } from '@/lib/api'

// ✅ Стало
import { transformSeller, processImageUrl } from '@/utils/api-transformers'
```

### Прямое использование экшенов

```typescript
// ✅ Новый рекомендуемый способ
import { homeGet, sellersGet, cartAddItem } from '@/actions'

const homeData = await homeGet()
const sellers = await sellersGet({ limit: 20 })
await cartAddItem({ productId: 123, quantity: 2 })
```

## 📋 Checklist для обновления кодовой базы

1. [ ] Заменить импорты `@/lib/api` на `@/lib/api-client`
2. [ ] Заменить типы `Api*` на `I*` из `@/types/api.types`
3. [ ] Обновить импорты трансформеров на `@/utils/api-transformers`
4. [ ] При необходимости использовать прямые экшены из `@/actions`
5. [ ] Обновить обработку ошибок с `result?.error` на `'error' in result`

## 🎁 Преимущества новой архитектуры

- 🚀 **Лучшая производительность** - автоматическое кеширование
- 🛡️ **Типобезопасность** - полная типизация на всех уровнях
- 🧩 **Модульность** - разделение по доменам
- 📝 **Читаемость** - единообразная структура
- 🔧 **Масштабируемость** - легко добавлять новые эндпоинты

## 🆘 Помощь

При возникновении проблем:

1. Проверьте новую документацию в `src/actions/README.md`
2. Используйте автокомплит TypeScript для правильных типов
3. Смотрите примеры в `src/lib/api-client.ts`
