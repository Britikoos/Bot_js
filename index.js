const TelegramApi = require('node-telegram-bot-api')

const token = ' '

const bot = new TelegramApi(token, {polling: true})

let arr = new Array();
arr =[ " Собственный подграф ", "Надграф", "Подграф"," Петля"," Дополнение графа "];

let ponarr = new Array();
ponarr = ["подграф, не совпадающий с исходным графом и не пустой."
    ,"исходный граф по отношению к подграфу.","граф G’ (V’, E’) является подграфом G(V, E), если V’ включено в V и E’ включено в E"
    ," ребро, соединяющее вершину саму с собой."
    ,"граф объединение которого с основным даст полный граф, а пересечение с основным даст 0."];

const collokOptions ={
    reply_markup: JSON.stringify({
        inline_keyboard : [
            [{text: '+',callback_data: '+1'}],
            [{text: '-',callback_data: '+0'}],
            [{text: 'stop',callback_data: '/stop'}],
        ]
    })
}

let count = 0;
let flag =true;

const start = () => {
    bot.setMyCommands([
            {command: '/start', descrition: 'Старт '},
            {command: '/letsgo', descrition: 'Начать подготовку'},
            {command: '/start', descrition: 'Закончить'},
        ]
    )
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            return bot.sendMessage(chatId, 'Привет ');
        }

        if (text === '/stop') {
            return bot.sendMessage(chatId, 'Пока ');
        }

        if (text === '/letsgo') {
            await bot.sendMessage(chatId, 'В начале тебе дается определение и ты должен рассказать мне его');
         //   while(count<10) {
                const randomNum = Math.floor(Math.random() * 10 % 4);
                await bot.sendMessage(chatId, arr[randomNum]);
                bot.on('answer', msg => {
                })
                await bot.sendMessage(chatId, ponarr[randomNum], collokOptions);
            }
            return bot.sendMessage(chatId, count);
     //   }

        return bot.sendMessage(chatId, 'Я тебя не понимаю');
    })
}

 bot.on( 'callback',msg =>{
     const data = msg.text;
     const chatId = msg.chat.id;
     count = 0;

     if(data === 'stop'){
         flag = false;
         return bot.sendMessage(chatId, 'Пока ');
     }
     if  (data === '+' ){
         count = count+1;
     }

 })

start();
