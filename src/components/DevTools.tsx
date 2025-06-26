'use client';

import { useState } from 'react';
import { switchMockTheme } from '@/utils/telegram-mock';
import { useTelegramInitData } from '@/hooks/useTelegramInitData';
import { toast } from 'sonner';

export const DevTools = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { initData, isReady } = useTelegramInitData();

  // Показываем только в режиме разработки
  if (process.env.NEXT_PUBLIC_MOCK_TELEGRAM !== 'true') {
    return null;
  }

  const handleThemeSwitch = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    switchMockTheme(newTheme);
  };

  const handleMainButtonTest = () => {
    if (window.Telegram?.WebApp?.MainButton) {
      const button = window.Telegram.WebApp.MainButton;
      button.setText('Тестовая кнопка');
      button.show();
      button.onClick(() => {
        toast.success('MainButton нажата!');
      });
    }
  };

  const handleBackButtonTest = () => {
    if (window.Telegram?.WebApp?.BackButton) {
      const button = window.Telegram.WebApp.BackButton;
      button.show();
      button.onClick(() => {
        toast.info('BackButton нажата!');
        button.hide();
      });
    }
  };

  const handleHapticTest = () => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
      toast('Haptic feedback сработал!');
    }
  };

  const handleToastTest = () => {
    const toasts = [
      () => toast('Обычное уведомление'),
      () => toast.success('Успешно!'),
      () => toast.error('Ошибка!'),
      () => toast.warning('Предупреждение!'),
      () => toast.info('Информация'),
    ];
    
    const randomToast = toasts[Math.floor(Math.random() * toasts.length)];
    randomToast();
  };

  const handleCloseApp = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.close();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Кнопка открытия */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        title="DevTools"
      >
        🛠️
      </button>

      {/* Панель DevTools */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              🤖 Telegram DevTools
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Статус */}
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="text-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${isReady ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="font-medium">
                  {isReady ? 'WebApp Ready' : 'WebApp Loading...'}
                </span>
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Mode: {process.env.NEXT_PUBLIC_MOCK_TELEGRAM === 'true' ? 'Mock' : 'Real'}
              </div>
            </div>
          </div>

          {/* Информация о пользователе */}
          {initData?.user && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Пользователь</h4>
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <div>ID: {initData.user.id}</div>
                <div>Имя: {initData.user.first_name} {initData.user.last_name}</div>
                {initData.user.username && <div>@{initData.user.username}</div>}
                <div>Язык: {initData.user.language_code}</div>
              </div>
            </div>
          )}

          {/* Кнопки тестирования */}
          <div className="space-y-2">
            <button
              onClick={handleThemeSwitch}
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              🎨 Переключить тему ({isDarkTheme ? 'Темная' : 'Светлая'})
            </button>

            <button
              onClick={handleMainButtonTest}
              className="w-full p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-sm"
            >
              🔘 Тест MainButton
            </button>

            <button
              onClick={handleBackButtonTest}
              className="w-full p-2 bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100 rounded hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-sm"
            >
              ⬅️ Тест BackButton
            </button>

            <button
              onClick={handleHapticTest}
              className="w-full p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100 rounded hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors text-sm"
            >
              📳 Тест Haptic
            </button>

            <button
              onClick={handleToastTest}
              className="w-full p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-100 rounded hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors text-sm"
            >
              🔔 Тест уведомлений
            </button>

            <button
              onClick={handleCloseApp}
              className="w-full p-2 bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm"
            >
              ❌ Закрыть WebApp
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('hasCompletedOnboarding');
                localStorage.removeItem('isLoggedIn');
                window.location.reload();
              }}
              className="w-full p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-100 rounded hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors text-sm"
            >
              🔄 Сбросить онбординг
            </button>
          </div>

          {/* Информация о WebApp */}
          {window.Telegram?.WebApp && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">WebApp Info</h4>
              <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                <div>Version: {window.Telegram.WebApp.version}</div>
                <div>Platform: {window.Telegram.WebApp.platform}</div>
                <div>Theme: {window.Telegram.WebApp.colorScheme}</div>
                <div>Viewport: {window.Telegram.WebApp.viewportHeight}px</div>
                <div>Expanded: {window.Telegram.WebApp.isExpanded ? 'Yes' : 'No'}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 