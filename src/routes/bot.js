const showMenu = require("./menus");
const getCryptoApi = require("./utils");

const Markup = require("telegraf/markup");
module.exports = (bot) => {
  const texto = (
    msg
  ) => `Welcome ${msg.from.username} to GeckoCoin (unoficial) Bot! created by AXELLAB
      
      /menu - Open menu\ntip:You can choose any symbol cryptocurrency, just call /btc for example!`;

  const keyboard = [
    [
      new Markup().urlButton(
        "All cryptocurrency commands",
        "https://geckocoin-bot-telegram.herokuapp.com/commands"
      ),
    ],
  ];

  bot.start((msg) =>
    msg.replyWithHTML(texto(msg), { disable_web_page_preview: true })
  );
  bot.catch((err, msg) => {
    msg.reply("Sorry i didn't understand what you said!?");
    console.log(err);
  });
  bot.use(showMenu.init());
  bot.on("text", async (msg) => {
    if (msg.message.entities[0].type === "bot_command") {
      msg.reply(await getCryptoApi(msg.message.text.replace("/", "")), {
        reply_markup: new Markup().inlineKeyboard(keyboard),
        parse_mode: "Html",
      });
    }
  });
};
