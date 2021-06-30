// Импорт Express
const express = require('express');
// Импорт Handlebars
const exhbs = require('express-handlebars');
// Импорт hw-10_menu.json
const menuItems = require('./hw-10_menu.json');
// добавляем в переменную express
const app = express();

// Создаем переменную для порта
const PORT = process.env.PORT || 1234;
// Задаем папку с статическими файлами
app.use(express.static('public'));
// По умолчанию в express шаблонизатор pug, мы меняем его на handlebars
// Регистрация движка
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exhbs({
    extname: 'hbs',
  }),
);

// регестрируем слушателя (get-запрос) для index.html
app.get('/', (req, res) => {
  res.render('home', { jsFileName: 'main', pageTitle: 'Web App Basics', cssFileName: 'main' });
});

// регестрируем слушателя (get-запрос) для hw-09.html и hw-10.html

app.get('/hw-09', (req, res) => {
  res.render('hw-09', {
    jsFileName: 'script-hw-09',
    cssFileName: 'hw-09',
    pageTitle: 'Homework-09',
  });
});
app.get('/hw-10', (req, res) => {
  res.render('hw-10', {
    menuItems,
    jsFileName: 'script-hw-10',
    cssFileName: 'hw-10',
    pageTitle: 'Homework-10',
  });
});

// создаем динамическую страницу
app.get('/hw-10-item/:itemId', (req, res) => {
  // console.log(req.params);

  const singleItem = menuItems.find(i => i.id === req.params.itemId);

  res.render('hw-10-item', {
    singleItem,
    jsFileName: 'script-item',
    pageTitle: 'item',
    cssFileName: 'hw-10-item',
  });
});

app.listen(PORT, () => {
  console.log(`Сервер приложения обрабатывается на port ${PORT}`);
});
