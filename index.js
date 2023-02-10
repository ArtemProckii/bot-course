const TelegramApi = require('node-telegram-bot-api'); // подключаем node-telegram-bot-api
const {gameOptions, againOptions} = require('./options')
const token = '5710866776:AAE7KZ27baNWZGRcW0gScQTkt3HgoBZJMxs';

const bot = new TelegramApi(token, {polling: true});

const chats = {}




const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'Сейчас я загадаю число от 0 до 9, а ты должен отгадать )))) ыыы')
  const randomNumber = Math.floor(Math.random() * 10 )
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Отгадывай давай', gameOptions)
}

const start = () => {

  bot.setMyCommands([
    {command: '/start', description: 'Начало'},
    {command: '/info', description: 'Информация'},
    {command: '/game', description: 'Поиграть'},


  ]);

  bot.on('message', async msg => {
    console.log(msg)
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
      await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp')
      return bot.sendMessage(chatId, 'Добро пожаловать в бота )');
    }

    if (text === '/info') {
      return bot.sendMessage(chatId, 'Твой user_name ');
    }

    if (text === '/game') {
     return startGame(chatId);
    }

    return bot.sendMessage(chatId, 'Я в ступоре')
  });
  bot.on('callback_query', msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === '/again'){
      return startGame(chatId);
    }
    if (data === chats[chatId]) {
      return  bot.sendMessage(chatId, 'Поздравляю, ты отгадал цифру', againOptions)
    } else {
      return  bot.sendMessage(chatId, 'Упс ты не угадал', againOptions)

    }
   console.log(msg)
  })
}
start ()
