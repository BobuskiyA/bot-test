const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')

const token = '7861619780:AAGuO7HRxJm7t7_gIHuET44YVjndS7fn8TU'

const bot = new TelegramApi(token, {polling: true})

const chats = {}


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Я загадую цифру від 0 до 9 і ти маєш вгадати `);
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] =randomNumber;
    await bot.sendMessage(chatId, 'Вгадуй', gameOptions)
}

const start = () => {

    bot.setMyCommands([
        {command: '/start', description: 'Початок'},
        {command: '/info', description: 'Інфа'},
        {command: '/game', description: 'Гра'},

    
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if (text === '/start'){
            await bot.sendSticker(chatId, `https://sl.combot.org/kit_56/webp/0xf09f98b3.webp`);
            return bot.sendMessage(chatId, `Доброго вечора`);
        }
        if (text === '/info'){
            return bot.sendMessage(chatId, `Інфа ${msg.from.first_name} ${msg.from.last_name}`);
        }
        if (text === '/game'){
            return startGame(chatId);
        }

        return bot.sendMessage(chatId, 'Не розумію тебе')
    })    

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId);
        }
            if (data === chats[chatId]) {
            return await bot.sendMessage(chatId, `Ти вгадав цифру ${chats[chatId]}`, againOptions)
        }else{
            return await bot.sendMessage(chatId, `Не вгадав цифру ${chats[chatId]}`, againOptions)
        }
    })

}

start();