# Руководство по деплою - Skorotut Telegram Web App

## 🚀 Подготовка к деплою

### 1. Финальная проверка кода

```bash
# Проверка типов TypeScript
pnpm type-check

# Линтинг кода
pnpm lint

# Сборка проекта
pnpm build

# Проверка размера бандла
pnpm analyze
```

### 2. Настройка переменных окружения

#### Production (.env.production)
```env
# API
NEXT_PUBLIC_API_URL=https://skorotut.kdigital.pro
NEXT_PUBLIC_ENVIRONMENT=production

# Telegram
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_production_bot_token
TELEGRAM_BOT_SECRET=your_production_bot_secret

# Отключаем mock в продакшене
NEXT_PUBLIC_MOCK_TELEGRAM=false
NEXT_PUBLIC_DEVELOPMENT_MODE=false
NEXT_PUBLIC_DEBUG=false

# Аналитика
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn

# Безопасность
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-domain.com
```

## 🌐 Деплой на Vercel (рекомендуется)

### 1. Подготовка проекта

```bash
# Установка Vercel CLI
npm i -g vercel

# Логин в Vercel
vercel login

# Инициализация проекта
vercel
```

### 2. Настройка vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "https://skorotut.kdigital.pro",
    "NEXT_PUBLIC_ENVIRONMENT": "production"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

### 3. Настройка домена

```bash
# Добавление кастомного домена
vercel domains add skorotut-webapp.com

# Настройка DNS записей
# A record: @ -> 76.76.19.61
# CNAME record: www -> cname.vercel-dns.com
```

### 4. Переменные окружения в Vercel

В панели Vercel добавить:
- `NEXT_PUBLIC_API_URL`
- `TELEGRAM_BOT_SECRET`
- `NEXT_PUBLIC_SENTRY_DSN`
- `NEXTAUTH_SECRET`

## 🤖 Настройка Telegram бота

### 1. Создание бота

```bash
# Отправить @BotFather в Telegram
/newbot

# Следовать инструкциям:
# 1. Выбрать имя бота: Skorotut
# 2. Выбрать username: skorotut_bot
# 3. Получить токен: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz
```

### 2. Настройка Web App

```bash
# Установить команды бота
/setcommands

# Добавить команды:
start - Запустить приложение
menu - Открыть меню
help - Помощь
```

### 3. Настройка Web App URL

```bash
# Установить Web App
/newapp

# Выбрать бота: @skorotut_bot
# Указать URL: https://skorotut-webapp.com
# Добавить описание: Skorotut - доставка еды и товаров
# Загрузить иконку (512x512 PNG)
```

### 4. Настройка Menu Button

```bash
# Установить кнопку меню
/setmenubutton

# Выбрать бота: @skorotut_bot
# Указать текст: Открыть магазин
# Указать Web App URL: https://skorotut-webapp.com
```

## 🔧 Настройка webhook (опционально)

### 1. Создание webhook эндпоинта

```typescript
// src/pages/api/telegram/webhook.ts
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Проверка подписи Telegram
  const token = process.env.TELEGRAM_BOT_SECRET;
  const signature = req.headers['x-telegram-bot-api-secret-token'];
  
  if (signature !== token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const update = req.body;
  
  // Обработка обновлений от Telegram
  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;
    
    if (text === '/start') {
      // Отправить приветственное сообщение с Web App кнопкой
      await sendWebAppMessage(chatId);
    }
  }

  res.status(200).json({ ok: true });
}

async function sendWebAppMessage(chatId: number) {
  const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const webAppUrl = 'https://skorotut-webapp.com';
  
  const message = {
    chat_id: chatId,
    text: 'Добро пожаловать в Skorotut! 🛒\n\nЗакажите еду и товары с доставкой прямо в Telegram.',
    reply_markup: {
      inline_keyboard: [[
        {
          text: '🛍️ Открыть магазин',
          web_app: { url: webAppUrl }
        }
      ]]
    }
  };

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  });
}
```

### 2. Установка webhook

```bash
# Установить webhook URL
curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://skorotut-webapp.com/api/telegram/webhook",
    "secret_token": "your_secret_token"
  }'
```

## 📱 Тестирование в Telegram

### 1. Тестирование в Test Environment

```bash
# Создать тестового бота
# Отправить @BotFather
/newbot

# Настроить тестовый Web App
/newapp
# URL: https://skorotut-webapp-test.vercel.app
```

### 2. Проверочный чек-лист

- [ ] Web App открывается в Telegram
- [ ] Тема синхронизируется с Telegram
- [ ] MainButton работает корректно
- [ ] BackButton функционирует
- [ ] Haptic feedback срабатывает
- [ ] Данные пользователя получаются
- [ ] Авторизация работает
- [ ] API запросы выполняются
- [ ] Корзина сохраняется
- [ ] Оформление заказа работает

## 🔍 Мониторинг и отладка

### 1. Настройка Sentry

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
  beforeSend(event) {
    // Фильтрация ошибок
    if (event.exception) {
      const error = event.exception.values?.[0];
      if (error?.value?.includes('Network Error')) {
        return null; // Не отправляем сетевые ошибки
      }
    }
    return event;
  },
});
```

### 2. Логирование

```typescript
// src/utils/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    if (process.env.NEXT_PUBLIC_DEBUG === 'true') {
      console.log(`[INFO] ${message}`, data);
    }
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
    if (process.env.NODE_ENV === 'production') {
      // Отправить в Sentry
      Sentry.captureException(error || new Error(message));
    }
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
  }
};
```

### 3. Аналитика

```typescript
// src/utils/analytics.ts
export const analytics = {
  pageView: (page: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!, {
        page_title: page,
        page_location: window.location.href,
      });
    }
  },
  
  event: (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  },
  
  purchase: (transactionId: string, value: number, items: any[]) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: 'RUB',
        items: items,
      });
    }
  }
};
```

## 🔒 Безопасность в продакшене

### 1. CSP заголовки

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' telegram.org *.googletagmanager.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https: *.skorotut.kdigital.pro;
      connect-src 'self' https://skorotut.kdigital.pro *.google-analytics.com *.sentry.io;
      frame-ancestors 'none';
    `.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
];
```

### 2. Rate Limiting

```typescript
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const rateLimitMap = new Map();

export function middleware(request: NextRequest) {
  const ip = request.ip || 'anonymous';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 минута
  const maxRequests = 100; // максимум запросов

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return NextResponse.next();
  }

  const userData = rateLimitMap.get(ip);
  
  if (now > userData.resetTime) {
    userData.count = 1;
    userData.resetTime = now + windowMs;
  } else {
    userData.count++;
  }

  if (userData.count > maxRequests) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

## 📊 Производительность

### 1. Оптимизация изображений

```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['skorotut.kdigital.pro'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};
```

### 2. Service Worker (опционально)

```typescript
// public/sw.js
const CACHE_NAME = 'skorotut-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
```

## 🎯 Финальный чек-лист деплоя

### Перед деплоем
- [ ] Все тесты проходят
- [ ] Код прошел code review
- [ ] Переменные окружения настроены
- [ ] Сборка проекта успешна
- [ ] Размер бандла оптимален

### После деплоя
- [ ] Домен настроен и работает
- [ ] SSL сертификат активен
- [ ] Telegram бот настроен
- [ ] Web App открывается в Telegram
- [ ] Все основные функции работают
- [ ] Мониторинг настроен
- [ ] Аналитика подключена

### Мониторинг
- [ ] Sentry получает ошибки
- [ ] Google Analytics собирает данные
- [ ] Логи приложения доступны
- [ ] Производительность в норме
- [ ] Пользователи могут оформлять заказы

## 🔄 CI/CD Pipeline (опционально)

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'pnpm'
    
    - name: Install dependencies
      run: pnpm install
    
    - name: Run tests
      run: pnpm test
    
    - name: Build project
      run: pnpm build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

---

**🎉 Поздравляем! Skorotut Telegram Web App готов к запуску!**

**Документация завершена:**
- ✅ development-plan.md
- ✅ api-endpoints.md  
- ✅ component-structure.md
- ✅ technical-requirements.md
- ✅ deployment-guide.md

**Следующий шаг:** Начать разработку с Этапа 1 - Настройка инфраструктуры 