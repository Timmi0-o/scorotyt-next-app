'use client';

import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function FloatingCartButton() {
  const { items, totalAmount, totalItems } = useCartStore();
  const router = useRouter();

  const isEmpty = items.length === 0;

  const handleCartClick = () => {
    if (isEmpty) return;
    
    toast.success('Переход в корзину');
    router.push('/cart');
  };

  if (isEmpty) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.4
        }}
        className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="bg-white rounded-t-3xl shadow-2xl pointer-events-auto overflow-hidden">
          {/* Информация о доставке */}
          <div className="flex justify-center items-center py-3">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => toast.info('Переход к информации о доставке')}
            >
              <span className="text-sm text-green-600 font-medium">
                доставка бесплатно
              </span>
              <ChevronRight className="w-4 h-4 text-green-600" />
            </div>
          </div>

          {/* Основная кнопка корзины */}
          <div className="px-6 pb-6">
            <Button
              onClick={handleCartClick}
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-t-3xl relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 p-0"
              size="lg"
            >
              <div className="flex items-center justify-between w-full px-6 py-4">
                {/* Левая часть - время доставки */}
                <div className="text-left">
                  <span className="text-sm font-medium text-white/80">
                    45-55 мин
                  </span>
                </div>

                {/* Центр - текст "Далее" */}
                <div>
                  <span className="font-bold text-lg text-white">
                    Далее
                  </span>
                </div>

                {/* Правая часть - сумма */}
                <div className="text-right">
                  <motion.span
                    key={totalAmount}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="font-bold text-base text-white"
                  >
                    {totalAmount}₽
                  </motion.span>
                </div>
              </div>

              {/* Индикатор количества товаров */}
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg"
                  >
                    {totalItems}
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
            
            {/* "Home indicator" для iPhone */}
            <div className="flex justify-center pt-4">
              <div className="w-32 h-1 bg-gray-400 rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 