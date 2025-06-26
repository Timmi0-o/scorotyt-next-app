// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { TelegramWebAppAPI } from '@/types/telegram';

// Mock для тестирования Telegram WebApp в браузере
export const createTelegramMock = () => {
  if (typeof window !== 'undefined' && !window.Telegram) {
    const mockUser = {
      id: parseInt(process.env.NEXT_PUBLIC_MOCK_USER_ID || '123456789'),
      first_name: "Тест",
      last_name: "Пользователь",
      username: "testuser",
      language_code: "ru",
      is_premium: false
    };

    const mockInitData = {
      user: mockUser,
      auth_date: Math.floor(Date.now() / 1000),
      hash: "mock_hash_for_testing",
      query_id: "mock_query_id"
    };

    // Создаем mock объект Telegram WebApp
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
          button_text_color: "#ffffff",
          secondary_bg_color: "#f4f4f5"
        },
        isExpanded: true,
        viewportHeight: window.innerHeight,
        viewportStableHeight: window.innerHeight,
        headerColor: "#ffffff",
        backgroundColor: "#ffffff",
        isClosingConfirmationEnabled: false,
        
        // Основные методы
        ready: () => {
          console.log("🤖 Telegram WebApp ready (mock mode)");
          // Применяем цвета темы
          document.documentElement.style.setProperty('--tg-theme-bg-color', '#ffffff');
          document.documentElement.style.setProperty('--tg-theme-text-color', '#000000');
          document.documentElement.style.setProperty('--tg-theme-hint-color', '#999999');
          document.documentElement.style.setProperty('--tg-theme-link-color', '#2481cc');
          document.documentElement.style.setProperty('--tg-theme-button-color', '#2481cc');
          document.documentElement.style.setProperty('--tg-theme-button-text-color', '#ffffff');
          document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', '#f4f4f5');
        },
        close: () => console.log("🤖 Telegram WebApp close (mock mode)"),
        expand: () => console.log("🤖 Telegram WebApp expand (mock mode)"),
        enableClosingConfirmation: () => console.log("🤖 Closing confirmation enabled"),
        disableClosingConfirmation: () => console.log("🤖 Closing confirmation disabled"),
        
        // MainButton
        MainButton: {
          text: "",
          color: "#2481cc",
          textColor: "#ffffff",
          isVisible: false,
          isActive: true,
          isProgressVisible: false,
          setText: (text: string) => {
            console.log("🤖 MainButton setText:", text);
            if (window.Telegram?.WebApp?.MainButton) {
              window.Telegram.WebApp.MainButton.text = text;
            }
          },
          onClick: (callback: () => void) => {
            console.log("🤖 MainButton onClick set", callback);
            // В реальном приложении здесь будет обработчик клика
          },
          offClick: (callback: () => void) => {
            console.log("🤖 MainButton offClick set", callback);
            // В реальном приложении здесь будет удаление обработчика
          },
          show: () => {
            console.log("🤖 MainButton show");
            if (window.Telegram?.WebApp?.MainButton) {
              window.Telegram.WebApp.MainButton.isVisible = true;
            }
          },
          hide: () => {
            console.log("🤖 MainButton hide");
            if (window.Telegram?.WebApp?.MainButton) {
              window.Telegram.WebApp.MainButton.isVisible = false;
            }
          },
          enable: () => {
            console.log("🤖 MainButton enable");
            if (window.Telegram?.WebApp?.MainButton) {
              window.Telegram.WebApp.MainButton.isActive = true;
            }
          },
          disable: () => {
            console.log("🤖 MainButton disable");
            if (window.Telegram?.WebApp?.MainButton) {
              window.Telegram.WebApp.MainButton.isActive = false;
            }
          },
          showProgress: (leaveActive?: boolean) => {
            console.log("🤖 MainButton showProgress", leaveActive);
            if (window.Telegram?.WebApp?.MainButton) {
              window.Telegram.WebApp.MainButton.isProgressVisible = true;
            }
          },
          hideProgress: () => {
            console.log("🤖 MainButton hideProgress");
            if (window.Telegram?.WebApp?.MainButton) {
              window.Telegram.WebApp.MainButton.isProgressVisible = false;
            }
          }
        },
        
        // BackButton
        BackButton: {
          isVisible: false,
          onClick: (callback: () => void) => {
            console.log("🤖 BackButton onClick set", callback);
            // В реальном приложении здесь будет обработчик клика
          },
          offClick: (callback: () => void) => {
            console.log("🤖 BackButton offClick set", callback);
            // В реальном приложении здесь будет удаление обработчика
          },
          show: () => {
            console.log("🤖 BackButton show");
            if (window.Telegram?.WebApp?.BackButton) {
              window.Telegram.WebApp.BackButton.isVisible = true;
            }
          },
          hide: () => {
            console.log("🤖 BackButton hide");
            if (window.Telegram?.WebApp?.BackButton) {
              window.Telegram.WebApp.BackButton.isVisible = false;
            }
          }
        },
        
        // HapticFeedback
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => {
            console.log("🤖 HapticFeedback impact:", style);
            // В браузере можем использовать navigator.vibrate если доступно
            if (navigator.vibrate) {
              const duration = style === 'light' ? 50 : style === 'medium' ? 100 : 200;
              navigator.vibrate(duration);
            }
          },
          notificationOccurred: (type: 'error' | 'success' | 'warning') => {
            console.log("🤖 HapticFeedback notification:", type);
            if (navigator.vibrate) {
              const pattern = type === 'error' ? [100, 50, 100] : 
                            type === 'success' ? [50] : [100, 100];
              navigator.vibrate(pattern);
            }
          },
          selectionChanged: () => {
            console.log("🤖 HapticFeedback selection changed");
            if (navigator.vibrate) {
              navigator.vibrate(30);
            }
          }
        }
      }
    };

    console.log("🤖 Telegram WebApp Mock initialized:", window.Telegram.WebApp);
  }
};

// Функция для переключения темы (для тестирования)
export const switchMockTheme = (isDark: boolean) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const colors = isDark ? {
      bg_color: "#1c1c1d",
      text_color: "#ffffff",
      hint_color: "#8e8e93",
      link_color: "#6ab7ff",
      button_color: "#5ac8fa",
      button_text_color: "#ffffff",
      secondary_bg_color: "#2c2c2e"
    } : {
      bg_color: "#ffffff",
      text_color: "#000000",
      hint_color: "#999999",
      link_color: "#2481cc",
      button_color: "#2481cc",
      button_text_color: "#ffffff",
      secondary_bg_color: "#f4f4f5"
    };

    window.Telegram.WebApp.colorScheme = isDark ? "dark" : "light";
    window.Telegram.WebApp.themeParams = colors;

    // Применяем CSS переменные
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--tg-theme-${key.replace('_', '-')}`, value);
    });

    console.log("🤖 Theme switched to:", isDark ? "dark" : "light");
  }
}; 