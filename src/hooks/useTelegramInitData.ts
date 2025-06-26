import { useEffect, useState } from 'react';
import { createTelegramMock } from '@/utils/telegram-mock';
import type { TelegramWebAppInitData } from '@/types/telegram';

export const useTelegramInitData = () => {
  const [initData, setInitData] = useState<TelegramWebAppInitData | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // В режиме разработки создаем mock
    if (process.env.NEXT_PUBLIC_MOCK_TELEGRAM === 'true') {
      createTelegramMock();
    }

    // Ждем загрузки Telegram WebApp
    const checkTelegram = () => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        setInitData(window.Telegram.WebApp.initDataUnsafe);
        setIsReady(true);
      } else {
        setTimeout(checkTelegram, 100);
      }
    };

    checkTelegram();
  }, []);
  
  return { initData, isReady };
}; 