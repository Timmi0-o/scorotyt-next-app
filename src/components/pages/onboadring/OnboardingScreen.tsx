'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface OnboardingScreenProps {
  onComplete: () => void;
  onLogin: () => void;
}

const onboardingData = [
  {
    title: 'Привезём всё самое вкусное и любимое',
    subtitle: 'Быстро',
    emoji: '🍕'
  },
  {
    title: 'Горячее из ресторанов и продукты из магазинов',
    subtitle: 'На любые желания',
    emoji: '🛒'
  },
  {
    title: 'Где бы вы ни были',
    subtitle: 'Доставим',
    emoji: '📍'
  }
];

export const OnboardingScreen = ({ onComplete, onLogin }: OnboardingScreenProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < onboardingData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleClose = () => {
    onComplete();
  };

  const handleLogin = () => {
    onLogin();
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at bottom right, #FFC502 1%, #FFFFFF 100%)'
      }}
      onClick={currentSlide < 2 ? nextSlide : undefined}
    >
      {/* Прогресс бар и кнопка закрытия */}
      <div className="absolute top-10 left-5 right-3 flex items-center z-10">
        <div className="flex-1 flex space-x-1.5 mr-4">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full flex-1 transition-colors duration-300 ${
                index === currentSlide ? 'bg-green-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleClose}
          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
        >
          <span className="text-gray-600 text-sm">✕</span>
        </button>
      </div>

      {/* Контент слайда */}
      <div className="flex flex-col h-screen pt-24">
        {/* Изображение */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="text-8xl mb-8">
              {onboardingData[currentSlide].emoji}
            </div>
          </div>
        </div>

        {/* Текст и кнопки */}
        <div className="px-6 pb-8">
          <div className="mb-8">
            <p className="text-lg font-medium text-gray-800 mb-1">
              {onboardingData[currentSlide].subtitle}
            </p>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {onboardingData[currentSlide].title}
            </h1>
          </div>

          {/* Кнопки на последнем слайде */}
          {currentSlide === 2 && (
            <div className="space-y-3">
              <Button
                onClick={handleLogin}
                variant="secondary"
                className="w-full py-4 rounded-full text-base font-medium"
                style={{ backgroundColor: '#EBEBEB', color: '#343434' }}
              >
                Войти
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 