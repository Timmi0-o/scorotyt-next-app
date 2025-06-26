# Технические требования - Skorotut Web App

## 🎯 Основные требования

### Производительность
- **Время загрузки**: Первая страница < 2 секунд
- **Размер бандла**: < 500KB (gzipped)
- **Lighthouse Score**: > 90 баллов
- **Core Web Vitals**: Все метрики в зеленой зоне

### Совместимость
- **Браузеры**: Chrome 90+, Safari 14+, Firefox 88+
- **Устройства**: iOS 12+, Android 8+
- **Telegram**: Web App API v6.0+

### Безопасность
- **HTTPS**: Обязательно для продакшена
- **CSP**: Content Security Policy
- **Валидация**: Все пользовательские данные
- **Авторизация**: JWT токены + Telegram initData

## 📁 Структура проекта

### Корневая структура
```
skorotut_tg_webapp/
├── src/                    # Исходный код приложения
├── public/                 # Статические файлы
├── !flow/                  # 📋 Документация проекта
├── @reference-only/        # 📚 Справочные материалы
│   ├── frontend/           # Оригинальный frontend код
│   ├── skorotut-flutter/   # Flutter приложение для анализа
│   ├── backend-api/        # API документация
│   └── Skorotut.postman_collection.json
├── package.json            # Зависимости проекта
├── next.config.ts          # Конфигурация Next.js
├── tailwind.config.ts      # Конфигурация Tailwind
└── tsconfig.json           # Конфигурация TypeScript
```

### Структура src/
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Корневой layout
│   ├── page.tsx            # Главная страница
│   ├── globals.css         # Глобальные стили
│   └── api/                # API routes
├── components/             # React компоненты
│   ├── ui/                 # UI Kit компоненты
│   ├── layout/             # Layout компоненты
│   └── business/           # Бизнес компоненты
├── hooks/                  # Custom React hooks
├── store/                  # Zustand stores
├── lib/                    # Утилиты и конфигурация
├── types/                  # TypeScript типы
└── utils/                  # Вспомогательные функции
```

## 🛠 Технологический стек

### Основа (уже установлено)
```json
{
  "next": "15.3.1",
  "react": "^19.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^4.0.0",
  "zustand": "^5.0.3",
  "axios": "^1.8.4",
  "telegram-webapps-types": "^1.0.5"
}
```

### Нужно добавить
```json
{
  "@tanstack/react-query": "^5.0.0",
  "framer-motion": "^10.16.0",
  "react-hook-form": "^7.47.0",
  "react-hot-toast": "^2.4.0",
  "clsx": "^2.0.0",
  "zod": "^3.22.0",
  "date-fns": "^2.30.0",
  "js-cookie": "^3.0.0",
  "react-intersection-observer": "^9.5.0"
}
```

### UI и анимации
```json
{
  "framer-motion": "^10.16.0",
  "react-hook-form": "^7.47.0",
  "react-hot-toast": "^2.4.0",
  "clsx": "^2.0.0"
}
```

### Утилиты
```json
{
  "date-fns": "^2.30.0",
  "js-cookie": "^3.0.0",
  "react-intersection-observer": "^9.5.0"
}
```

## 🧪 Тестирование в браузере

### Mock Telegram WebApp API

Создаем файл `src/utils/telegram-mock.ts`:

```typescript
// Mock для тестирования в браузере
export const createTelegramMock = () => {
  if (typeof window !== 'undefined' && !window.Telegram) {
    const mockUser = {
      id: 123456789,
      first_name: "Тест",
      last_name: "Пользователь",
      username: "testuser",
      language_code: "ru",
      is_premium: false
    };

    const mockInitData = {
      user: mockUser,
      auth_date: Math.floor(Date.now() / 1000),
      hash: "mock_hash_for_testing"
    };

    window.Telegram = {
      WebApp: {
        initData: JSON.stringify(mockInitData),
        initDataUnsafe: mockInitData,
        version: "6.0",
        platform: "web",
        colorScheme: "light",
        themeParams: {
          bg_color: "#ffffff",
          text_color: "#000000",
          hint_color: "#999999",
          link_color: "#2481cc",
          button_color: "#2481cc",
          button_text_color: "#ffffff"
        },
        isExpanded: true,
        viewportHeight: window.innerHeight,
        viewportStableHeight: window.innerHeight,
        headerColor: "#ffffff",
        backgroundColor: "#ffffff",
        isClosingConfirmationEnabled: false,
        
        // Методы
        ready: () => console.log("Telegram WebApp ready (mock)"),
        close: () => console.log("Telegram WebApp close (mock)"),
        expand: () => console.log("Telegram WebApp expand (mock)"),
        enableClosingConfirmation: () => {},
        disableClosingConfirmation: () => {},
        
        // MainButton
        MainButton: {
          text: "",
          color: "#2481cc",
          textColor: "#ffffff",
          isVisible: false,
          isActive: true,
          isProgressVisible: false,
          setText: (text: string) => console.log("MainButton setText:", text),
          onClick: (callback: () => void) => console.log("MainButton onClick set"),
          show: () => console.log("MainButton show"),
          hide: () => console.log("MainButton hide"),
          enable: () => console.log("MainButton enable"),
          disable: () => console.log("MainButton disable"),
          showProgress: () => console.log("MainButton showProgress"),
          hideProgress: () => console.log("MainButton hideProgress")
        },
        
        // BackButton
        BackButton: {
          isVisible: false,
          onClick: (callback: () => void) => console.log("BackButton onClick set"),
          show: () => console.log("BackButton show"),
          hide: () => console.log("BackButton hide")
        },
        
        // HapticFeedback
        HapticFeedback: {
          impactOccurred: (style: string) => console.log("HapticFeedback impact:", style),
          notificationOccurred: (type: string) => console.log("HapticFeedback notification:", type),
          selectionChanged: () => console.log("HapticFeedback selection changed")
        }
      }
    };
  }
};
```

### Переменные окружения для разработки

`.env.local`:
```env
# API
NEXT_PUBLIC_API_URL=https://skorotut.kdigital.pro
NEXT_PUBLIC_DEV_API_URL=https://dev.skorotut.kdigital.pro

# Telegram
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_BOT_SECRET=your_bot_secret

# Режим разработки
NEXT_PUBLIC_DEVELOPMENT_MODE=true
NEXT_PUBLIC_MOCK_TELEGRAM=true
NEXT_PUBLIC_MOCK_USER_ID=123456789

# Отладка
NEXT_PUBLIC_DEBUG=true
NEXT_PUBLIC_LOG_LEVEL=debug
```

### Условная инициализация

`src/hooks/useTelegramWebApp.ts`:
```typescript
import { useEffect, useState } from 'react';
import { createTelegramMock } from '@/utils/telegram-mock';

export const useTelegramWebApp = () => {
  const [isReady, setIsReady] = useState(false);
  const [webApp, setWebApp] = useState<any>(null);

  useEffect(() => {
    // В режиме разработки создаем mock
    if (process.env.NEXT_PUBLIC_MOCK_TELEGRAM === 'true') {
      createTelegramMock();
    }

    // Ждем загрузки Telegram WebApp
    const checkTelegram = () => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        setWebApp(window.Telegram.WebApp);
        setIsReady(true);
      } else {
        setTimeout(checkTelegram, 100);
      }
    };

    checkTelegram();
  }, []);

  return { webApp, isReady };
};
```

### Компонент для переключения режимов

`src/components/DevTools.tsx`:
```typescript
'use client';

import { useState } from 'react';

export const DevTools = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Показываем только в development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-500 text-white p-2 rounded-full shadow-lg"
      >
        🛠️
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white border rounded-lg shadow-lg p-4 min-w-[200px]">
          <h3 className="font-bold mb-2">Dev Tools</h3>
          
          <div className="space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="block w-full text-left p-2 hover:bg-gray-100 rounded"
            >
              🔄 Перезагрузить
            </button>
            
            <button
              onClick={() => localStorage.clear()}
              className="block w-full text-left p-2 hover:bg-gray-100 rounded"
            >
              🗑️ Очистить localStorage
            </button>
            
            <button
              onClick={() => console.log('Telegram WebApp:', window.Telegram?.WebApp)}
              className="block w-full text-left p-2 hover:bg-gray-100 rounded"
            >
              📱 Лог Telegram API
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
```

## 📱 Адаптация под Telegram

### Стили для Telegram темы

`src/styles/telegram.css`:
```css
:root {
  --tg-theme-bg-color: var(--telegram-bg-color, #ffffff);
  --tg-theme-text-color: var(--telegram-text-color, #000000);
  --tg-theme-hint-color: var(--telegram-hint-color, #999999);
  --tg-theme-link-color: var(--telegram-link-color, #2481cc);
  --tg-theme-button-color: var(--telegram-button-color, #2481cc);
  --tg-theme-button-text-color: var(--telegram-button-text-color, #ffffff);
}

/* Применяем цвета Telegram */
body {
  background-color: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
}

/* Убираем стандартные стили браузера для мобильных */
* {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

/* Разрешаем выделение для текстовых полей */
input, textarea {
  -webkit-user-select: text;
  user-select: text;
}
```

### Настройка viewport

`src/pages/_document.tsx`:
```typescript
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" 
        />
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

## 🔧 Настройка сборки

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['skorotut.kdigital.pro'],
    unoptimized: true, // Для Telegram WebApp
  },
  // Оптимизация для мобильных
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // PWA настройки
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Webpack оптимизация
```javascript
// В next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Уменьшаем размер бандла
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
};
```

## 🚀 Деплой и хостинг

### Vercel (рекомендуется)
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
    "NEXT_PUBLIC_API_URL": "https://skorotut.kdigital.pro"
  }
}
```

### Netlify
```toml
[build]
  command = "pnpm build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📊 Мониторинг и аналитика

### Sentry для ошибок
```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});
```

### Метрики производительности
```typescript
// src/utils/analytics.ts
export const trackPageView = (page: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: page,
      page_location: window.location.href,
    });
  }
};

export const trackEvent = (action: string, category: string, label?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};
```

## 🔒 Безопасность

### CSP заголовки
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' telegram.org;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      connect-src 'self' https://skorotut.kdigital.pro;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];
```

### Валидация данных
```typescript
// src/utils/validation.ts
import { z } from 'zod';

export const phoneSchema = z.string()
  .regex(/^7\d{10}$/, 'Неверный формат номера телефона');

export const addressSchema = z.object({
  street: z.string().min(1, 'Укажите улицу'),
  building: z.string().min(1, 'Укажите дом'),
  apartment: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
});
```

## 🎯 Чек-лист готовности

### Разработка
- [ ] Mock Telegram API настроен
- [ ] Компоненты адаптированы под мобильные
- [ ] Темная тема поддерживается
- [ ] Все API эндпоинты протестированы
- [ ] Обработка ошибок реализована

### Производительность
- [ ] Lazy loading компонентов
- [ ] Оптимизация изображений
- [ ] Минификация CSS/JS
- [ ] Gzip сжатие
- [ ] Service Worker (опционально)

### Безопасность
- [ ] HTTPS настроен
- [ ] CSP заголовки
- [ ] Валидация всех форм
- [ ] Защита от XSS
- [ ] Rate limiting API

### Telegram интеграция
- [ ] WebApp API корректно работает
- [ ] MainButton настроен
- [ ] BackButton работает
- [ ] Haptic feedback реализован
- [ ] Тема синхронизирована

---

**Итого документов создано: 3/4**
**Осталось создать: deployment-guide.md** 