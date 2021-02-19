// ждем когда всё загрузится и потом выполняем
window.addEventListener("load", () => {
  // создание объектов классов
  // объект(класс) настроек
  const settings = new Settings();
  // статус
  const status = new Status();
  // объект змейки
  const snake = new Snake();
  // объект (класс) игрового поля
  const board = new Board();
  // объект контроль, элементы управления(бывший меню). отвечает за работу кнопок(старт, пауза), счётчика и пр.
  const controls = new Controls();
  // еда. класс удален
  // const food = new Food();
  // объект игры
  const game = new Game();
  // счёт игры
  const score = new Score();

  // Передача настроек
  //* рефакторинг +. свои настр. в перемен
  const initialSettings = { speed: 5, winLength: 7 };

  //  в классе settings метод init (установка начальных значений). в виде объекта передаем настройки для нашей игры(скорость, длина для выйгрыша)
  settings.init(initialSettings);
  //* рефакторинг -. терь передае через переменную
  // settings.init({ speed: 5, winLength: 5 });
  // змейке перед настройки
  snake.init(settings);
  // передаем в board через init, настройки и змейку
  board.init(settings, snake);
  //* рефакторинг -. класс удалён. в food передаем настройки,змейку и игр поле
  // food.init(settings, snake, board);
  // в game передаем ссылки на объекты
  game.init(settings, status, board, snake, controls, score);
  //
  score.init(settings);
  //* рефакторинг +. в контрол передаем класс game
  controls.init(game);

  //* рефакторинг +. запуск
  // отрисовываем игровое поле
  board.renderBoard();
  //* рефакторинг +. отрисов. змейку
  board.renderSnake(snake);
  // board.renderSnake();
  //* рефакторинг +.
  score.renderPointsForWin(initialSettings.winLength);
  //* рефакторинг +. создаем новую еду
  board.renderNewFood();
  // food.setNewFood();
  //* рефакторинг +.
  score.renderCurrentScore(snake.body.length);
  //* рефакторинг +. в классе controls(эл. управл.), вызов слуш.событ.
  controls.addControlsEventListeners();
  //* рефакторинг -. была часть запусков, расбросаное управление
  // метод обработчика сотытия клика
  // game.run();

  // score.renderCurrentSpeed(initialSettings.winLength);
  score.renderCurrentSpeed(initialSettings.speed);
});

// изучить принципы SOLID

// Принцип единственной ответственности (Single Responsibility Principle)
// Существует лишь одна причина, приводящая к изменению класса.
// Один класс должен решать только какую-то одну задачу.

// Принцип открытости/закрытости (Open-closed Principle)
// Программные сущности должны быть открыты для расширения, но закрыты для модификации.
// Программные сущности (классы, модули, функции и прочее) должны быть расширяемыми без изменения своего содержимого.

// Принцип подстановки Барбары Лисков (Liskov Substitution Principle)
// Функции, использующие указатели ссылок на базовые классы, должны уметь использовать объекты производных классов, даже не зная об этом.
// Попросту говоря: подкласс/производный класс должен быть взаимозаменяем с базовым/родительским классом.

// Принцип разделения интерфейса (Interface Segregation Principle)
// Нельзя заставлять клиента реализовать интерфейс, которым он не пользуется.
// Это означает, что нужно разбивать интерфейсы на более мелкие, лучше удовлетворяющие конкретным потребностям клиентов.

// Принцип инверсии зависимостей (Dependency Inversion Principle)
// Высокоуровневые модули не должны зависеть от низкоуровневых. Оба вида модулей должны зависеть от абстракций.
// Абстракции не должны зависеть от подробностей. Подробности должны зависеть от абстракций.
// Проще говоря: зависьте от абстракций, а не от чего-то конкретного.

// Инкапсуляция - размещение в одном компоненте/классе/файле/структуре данных/методов/функций/свойств, которые с ними работают(в Board размещать только то относится к полу(таблица, игровое поле, отрисовка и очистка его, отрисовка змейки и еды, проверка на аварию с полем))

//! если в файле только один класс то его имя пишут с большой буквы (хорошая практика  - один файл - один класс)

//! this. везде (почти) указывает на объект в котом находиться. здесь Board

//! через метод init мы будем передовать в какойто объект сылки на др объекты.
//! 1 Мы так конролим от чего зависит наш файл. Видно в самом init
//! 2 Более низкая связаность файлов, благодаря собственым свойствам (например в Board.js - this.settings,this.board)

//! ??? Настройки - скорость, бортик, супер бортик(появл. проходы), препятствия, голод, обманки, отрава, время еды

//! ещё одна змейка. файлы в папке змейка.www.
//??? не раб - не проверял что и как. взять различ. цвет головы и тела
// https://itproger.com/news/sozdanie-igri-zmeyka-na-chistom-javascript-i-html5
// https://www.youtube.com/watch?v=hM2vvcXBV84
