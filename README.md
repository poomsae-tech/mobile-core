# Mobile Core — Poomsae Tech

## 🚀 Технический стек

- React 19 — библиотека для создания пользовательских интерфейсов  
- TypeScript — статическая типизация  
- Expo — фреймворк для кроссплатформенных приложений React Native  
- Expo Router — маршрутизация внутри приложения  
- React Navigation — навигация между экранами  
- ESLint — статический анализ кода  
- Node.js & npm — окружение для разработки  

## 📁 Структура проекта

```bash
app/
├── components/       # Переиспользуемые компоненты
├── screens/          # Страницы приложения (создаём новые страницы здесь)
├── navigation/       # Конфигурация навигации
├── assets/           # Статические ресурсы: картинки, иконки
├── hooks/            # Кастомные хуки
└── utils/            # Утилиты и функции
```

## 🖥️ Команды для разработки

### Запуск проекта
```bash
npx expo start        # dev-сервер
```

> w → открыть в браузере  
> a → открыть на Android  
> i → открыть на iOS  
> QR-код → сканируем через Expo Go  

### Установка новых библиотек
```bash
npx expo install <package>
```

### Проверка кода
```bash
npm run lint
```

## ⚙️ Работа с Git и ветками

### Создать ветку для задачи
```bash
git checkout -b feature/<название_задачи>
```

### Пушим ветку на GitHub
```bash
git push -u origin feature/<название_задачи>
```

> После завершения работы создаём Pull Request в main.  
> ⚠️ Не пушить: node_modules/, .expo/, .expo-shared/, dist/, временные файлы.  

## 📦 Установка проекта для новичка

1. Установить Node.js (v20.20.1)
```bash
https://nodejs.org/en/download/archive/v20.20.1/  
```

2. Установить Git
```bash
https://git-scm.com/install/windows
```

3. Клонировать репозиторий:
```bash
git clone https://github.com/poomsae-tech/mobile-core.git
cd mobile-core
```

4. Установить зависимости:
```bash
npm install
```

5. Запустить проект:
```bash
npx expo start
```

> ✅ Тестировать через **Expo Go** на телефоне
