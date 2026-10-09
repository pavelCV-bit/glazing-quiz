export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, phone, object, size, type, outward, insul, when, priceRange } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, error: 'Телефон обязателен' });
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Не заданы переменные окружения TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID');
      return res.status(500).json({ success: false, error: 'Ошибка конфигурации сервера' });
    }

    const text = 
      `🪟 <b>Новая заявка на остекление</b>\n\n` +
      `👤 <b>Имя:</b> ${escapeHtml(name || 'Без имени')}\n` +
      `📞 <b>Телефон:</b> ${escapeHtml(phone)}\n\n` +
      `📌 <b>Объект:</b> ${escapeHtml(object || '-')}\n` +
      `📏 <b>Размер:</b> ${escapeHtml(size || '-')}\n` +
      `❄️ <b>Тип:</b> ${escapeHtml(type || '-')}\n` +
      `🏗 <b>Вынос:</b> ${escapeHtml(outward || '-')}\n` +
      `🛠 <b>Утепление/отделка:</b> ${escapeHtml(insul || '-')}\n` +
      `⏱ <b>Сроки:</b> ${escapeHtml(when || '-')}\n\n` +
      `💰 <b>Расчетная вилка:</b> ${escapeHtml(priceRange || '-')}`;

    const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'HTML'
      })
    });

    const tgData = await tgResponse.json();

    if (!tgData.ok) {
      console.error('Ошибка Telegram API:', tgData);
      return res.status(500).json({ success: false, error: 'Не удалось отправить сообщение в Telegram' });
    }

    return res.status(200).json({ success: true, message: 'Заявка успешно отправлена!' });
  } catch (error) {
    console.error('Ошибка сервера:', error);
    return res.status(500).json({ success: false, error: 'Внутренняя ошибка сервера' });
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
