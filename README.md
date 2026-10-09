# 🪟 Квиз-калькулятор остекления с отправкой заявок в Telegram

Простой веб-интерфейс расчета стоимости остекления балконов и окон с отправкой готовых заявок прямо в Telegram-бот.

## 🚀 Технологический стек
- **Frontend**: Pure HTML, CSS, JavaScript
- **Backend**: Node.js Serverless Function (Vercel)
- **Интеграция**: Telegram Bot API

---

## 🛠 Настройка Telegram Бота

1. **Создайте бота в Telegram:**
   - Найдите `@BotFather` в Telegram.
   - Отправьте команду `/newbot` и следуйте инструкциям.
   - Сохраните полученный **API Token** (например: `7123456789:AAE...`).

2. **Получите Chat ID:**
   - Для получения личного ID напишите боту `@userinfobot`.
   - Если хотите получать заявки в группу:
     - Добавьте вашего созданного бота в группу.
     - Назначьте его администратором.
     - Добавьте бота `@myidbot` в группу, чтобы узнать ID группы (он будет начинаться с `-100...`).

---

## 💻 Локальный запуск

1. Установите Vercel CLI (если еще не установлен):
   ```bash
   npm i -g vercel
   ```

2. В корневой папке проекта создайте файл `.env.local` и укажите данные:
   ```env
   TELEGRAM_BOT_TOKEN=ваш_токен_бота
   TELEGRAM_CHAT_ID=ваш_chat_id
   ```

3. Запустите локальный сервер разработки Vercel:
   ```bash
   vercel dev
   ```
   Приложение станет доступно по адресу `http://localhost:3000`.

---

## ☁️ Деплой на Vercel и GitHub

### Вариант через GitHub (Рекомендуемый)

1. Создайте репозиторий на GitHub и загрузите туда содержимое архива:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/ВАШ_USERNAME/glazing-quiz.git
   git push -u origin main
   ```

2. Перейдите на [Vercel](https://vercel.com/) и нажмите **"Add New" -> "Project"**.
3. Импортируйте ваш репозиторий с GitHub.
4. В разделе **Environment Variables** добавьте две переменные:
   - `TELEGRAM_BOT_TOKEN` — Токен вашего бота.
   - `TELEGRAM_CHAT_ID` — ID чата или группы.
5. Нажмите **Deploy**.
