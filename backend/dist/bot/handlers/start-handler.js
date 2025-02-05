import bot from "../../lib/telegram/config.js";
export const startHandler = () => {
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        const resp = "Welcome! Use /help to see available commands.";
        bot.sendMessage(chatId, resp);
    });
};
