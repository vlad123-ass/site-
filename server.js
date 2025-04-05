const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const TELEGRAM_TOKEN = '7319491525:AAHjJngTe50VxcFBr-z9-q_GUqxeSU_J_jY';
const CHAT_ID = '5289997696';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log('Новый IP:', ip);

  const message = `Новый посетитель на сайте\nIP: ${ip}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
    });
  } catch (error) {
    console.error('Ошибка при отправке в Telegram:', error.message);
  }

  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000, () => {
  console.log('Сервер запущен: http://localhost:3000');
});
