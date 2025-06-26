'use client';

import { useState, useEffect } from 'react';
import { SplashScreen } from './SplashScreen';
import { OnboardingScreen } from './OnboardingScreen';

interface AppInitializerProps {
  children: React.ReactNode;
}

type AppState = 'splash' | 'onboarding' | 'auth' | 'main';

export const AppInitializer = ({ children }: AppInitializerProps) => {
  const [appState, setAppState] = useState<AppState>('splash');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Устанавливаем флаг клиентской стороны
    setIsClient(true);
    
    // Временно: всегда переходим к главному экрану для тестирования
    console.log('🚀 AppInitializer: Will show main app after splash');
    
    // Проверяем, прошел ли пользователь онбординг
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    console.log('🔍 AppInitializer state:', { hasCompletedOnboarding, isLoggedIn });
    
    // Временно отключаем онбординг для тестирования API
    localStorage.setItem('hasCompletedOnboarding', 'true');
    localStorage.setItem('isLoggedIn', 'true');
  }, []);

  // Показываем splash до инициализации клиента
  if (!isClient) {
    return <SplashScreen onComplete={() => {}} />;
  }

  const handleSplashComplete = () => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    
    console.log('🎬 Splash completed, hasCompletedOnboarding:', hasCompletedOnboarding);
    
    if (hasCompletedOnboarding === 'true') {
      console.log('➡️ Going to main app');
      setAppState('main');
    } else {
      console.log('➡️ Going to onboarding');
      setAppState('onboarding');
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setAppState('main');
  };

  const handleLogin = () => {
    // В будущем здесь будет переход к экрану авторизации
    localStorage.setItem('hasCompletedOnboarding', 'true');
    localStorage.setItem('isLoggedIn', 'true');
    setAppState('main');
  };

  console.log('🎭 Current app state:', appState);

  switch (appState) {
    case 'splash':
      return <SplashScreen onComplete={handleSplashComplete} />;
    
    case 'onboarding':
      return (
        <OnboardingScreen 
          onComplete={handleOnboardingComplete}
          onLogin={handleLogin}
        />
      );
    
    case 'auth':
      // В будущем здесь будет экран авторизации
      return <div>Auth Screen</div>;
    
    case 'main':
    default:
      console.log('🏠 Rendering main app');
      return <>{children}</>;
  }
}; 