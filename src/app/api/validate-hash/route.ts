import { createHash, createHmac } from 'crypto';
import { NextResponse } from 'next/server';

// Ожидаемая структура initData
interface TelegramWebAppData {
  hash: string;
  [key: string]: string;
}

export async function POST(request: Request) {
  try {
    const { hash: initData } = await request.json();
    const botToken = process.env.BOT_TOKEN;

    // Ошибка конфигурации если нет токена бота
    if (!botToken) {
      console.error('BOT_TOKEN не установлен в переменных окружения');
      return NextResponse.json({ error: 'Ошибка конфигурации сервера' }, { status: 500 });
    }

    // Проверка наличия данных
    if (!initData) {
      return NextResponse.json({ error: 'Отсутствуют данные авторизации' }, { status: 400 });
    }

    // Декодируем данные из URL формата
    const urlParams = new URLSearchParams(initData);

    // Распаковываем данные и хэш
    const data = Object.fromEntries(urlParams.entries()) as TelegramWebAppData;
    const hash = data.hash;
    
    // Создаем копию данных без hash для валидации
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash: _, ...dataForValidation } = data;

    // Сортируем по ключу для создания data-check-string
    const checkString = Object.entries(dataForValidation)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Создаем SHA-256 HMAC с токеном бота
    const secretKey = createHash('sha256')
      .update(botToken)
      .digest();

    // Вычисляем подпись
    const signature = createHmac('sha256', secretKey)
      .update(checkString)
      .digest('hex');

    // Сравниваем подписи
    if (signature === hash) {
      return NextResponse.json({ status: 'valid' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Хэш недействителен' }, { status: 401 });
    }
  } catch (error) {
    console.error('Ошибка валидации хэша:', error);
    return NextResponse.json({ error: 'Ошибка обработки запроса' }, { status: 500 });
  }
} 