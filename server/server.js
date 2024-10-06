const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Путь к файлу для хранения пользователей
const USERS_FILE = './users.json';

// Чтение пользователей из JSON-файла
const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
};

// Запись пользователей в JSON-файл
const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Регистрация пользователя
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  // Проверка, существует ли пользователь
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Пользователь уже существует.' });
  }

  // Добавление нового пользователя
  users.push({ username, password });
  writeUsers(users);
  res.status(201).json({ message: 'Пользователь зарегистрирован.' });
});

// Авторизация пользователя
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  // Проверка пользователя
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    return res.status(200).json({ message: 'Успешная авторизация!' });
  } else {
    return res.status(401).json({ message: 'Неверное имя пользователя или пароль.' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
