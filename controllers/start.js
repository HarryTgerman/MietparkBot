const Telegram = require('telegram-node-bot');


class startController extends Telegram.TelegramBaseController  {

  startHandler($) {

      $.sendMessage('Hallo \nIch bin der MietparkBot.\nDurch mich kannst du schnell und einfach Reservierungen bei Mietpark Germersheim tätigen. \nLegen wir gleich los: \nclicke oder schreibe \n/Baumaschienen')
  }

  get routes() {
      return {
          'startCommand': 'startHandler',
      };
  }
}

module.exports = startController;
