const Telegram = require('telegram-node-bot');

const nodemailer = require('nodemailer');

const form = {
    name: {
	    q: 'Bitte Vor- und Nachname eingeben',
	    error: 'sorry, falsche eingabe',
	    validator: (message, callback) => {
		    if(message.text) {
			    callback(true, message.text) //you must pass the result also
			    return
		    }

		    callback(false)
	    }
    },
    zeitraum: {
	    q: 'Bitte Zeitraum eingeben',
	    error: 'sorry, falsche eingabe',
      validator: (message, callback) => {
		    if(message.text) {
			    callback(true, message.text) //you must pass the result also
			    return
		    }

		    callback(false)
	    }
    },
    email: {
	    q: 'Bitte Emailadresse eingeben eingeben',
	    error: 'sorry, falsche eingabe',
	    validator: (message, callback) => {
		    if(message.text) {
			    callback(true, message.text) //you must pass the result also
			    return
		    }

		    callback(false)
	    }
    },
    telefone: {
	    q: 'Bitte Telefonnummer eingeben',
	    error: 'sorry, falsche eingabe',
      validator: (message, callback) => {
		    if(message.text) {
			    callback(true, message.text) //you must pass the result also
			    return
		    }

		    callback(false)
	    }
    },
    lieverAnschrift: {
	    q: 'Bitte Liefer & Rechnugsadresse eingeben',
	    error: 'sorry, falsche eingabe',
	    validator: (message, callback) => {
		    if(message.text) {
			    callback(true, message.text) //you must pass the result also
			    return
		    }

		    callback(false)
	    }
    },
}

function mailer (result, artikel) {
const  message = 'Reservierung für: '+artikel+ ' \tZeitraum: ' + result.zeitraum +'\nName: ' + result.name +'\n Email: ' + result.email + "\n Telefon: " + result.telefone + "\n Lieferanschrift: " +result.lieverAnschrift
const transporter = nodemailer.createTransport({
               service: 'gmail',
               auth: {
                          user: 'mietparkbot@gmail.com',
                          pass: 'Haggy!2345'
                      }
             })

             var mailOptions = {
               from: 'MietParkBot <mietparkbot@gmail.com>',
               to: 'harrytrippel@gmx.de,reservierung@mietpark-germersheim.de',
               subject: 'Reservierung',
               text: message,
             }

             transporter.sendMail(mailOptions, function (err, res) {
               if(err){
                   console.log('Error');
               } else {
                   console.log('Email Sent');
               }
             })
}

class anhaengerController extends Telegram.TelegramBaseController  {

  anhaengerHandler($) {
      $.sendMessage('Wähle einen Anhaenger \n/Humbaur_Tieflader \n/Humbaur_Planenanhaenger \n/Boeckmann_Kipper')
  }

  Humbaur_TiefladerHandler($) {

      $.sendMessage('Details ansehen \n /DetailsHumbaur_Tieflader \n oder Reservieren \n /ReservierenHumbaur_Tieflader')
  }

    detailsHumbaur_TiefladerHandler($) {
        $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/Humbaur%20Tieflader.jpg?alt=media&token=ffd88969-1d72-4a98-a74d-68660a43a69c', filename: 'Humbaur_Tieflader.jpg'})
        $.sendMessage('GEWICHT: 1750kg \nMAX. NUTZLAST: 3500kg \nPREIS PRO TAG: 40,00€ \nPREIS PRO WOCHE/MONAT: auf Anfrage \noder /ReservierenHumbaur_Tieflader')
    }

    reservierenHumbaur_TiefladerHandler($) {
      $.runForm(form, (result) => {
         console.log(result)
         const artikel = 'Humbaur Tieflader'
         $.sendMessage('Humbaur Tieflader wurde reserviert')
         mailer(result)}
      )}
    Humbaur_PlanenanhaengerHandler($) {

        $.sendMessage('Details ansehen \n /DetailsHumbaur_Planenanhaenger \n oder Reservieren \n /ReservierenHumbaur_Planenanhaenger')
    }

      detailsHumbaur_PlanenanhaengerHandler($) {
          $.sendMessage('GEWICHT: 1200kg \nMAX. NUTZLAST: 1950kg \nPREIS PRO TAG: 20,00€ \nPREIS PRO WOCHE/MONAT: auf Anfrage \noder /ReservierenHumbaur_Planenanhaenger')
      }

      reservierenHumbaur_PlanenanhaengerHandler($) {
        $.runForm(form, (result) => {
           console.log(result)
           const artikel = 'Humbaur Planenanhaenger'
           $.sendMessage('Humbaur Planenanhaenger wurde reserviert')
           mailer(result)}
        )}
      Boeckmann_KipperHandler($) {

          $.sendMessage('Details ansehen \n /DetailsBoeckmann_Kipper \n oder Reservieren \n /ReservierenBoeckmann_Kipper')
      }

        detailsBoeckmann_KipperHandler($) {
            $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/Bildschirmfoto%202018-01-31%20um%2008.46.14.png?alt=media&token=75f23f2c-7558-49cd-a34d-d214d54639e9', filename: 'Boeckmann_Kipper.jpg'})
            $.sendMessage('GEWICHT: 1750kg \nMAX. NUTZLAST: 3500kg \nPREIS PRO TAG: 45,00€ \nPREIS PRO WOCHE/MONAT: auf Anfrage \noder /ReservierenBoeckmann_Kipper')
        }

        reservierenBoeckmann_KipperHandler($) {
          $.runForm(form, (result) => {
             console.log(result)
             const artikel = 'Böckmann Kipper'
             $.sendMessage('Böckmann Kipper wurde reserviert')
             mailer(result)}
          )}

  get routes() {
      return {
          'anhaengerCommand': 'anhaengerHandler',
          'Humbaur_TiefladerCommand':'Humbaur_TiefladerHandler',
            'detailsHumbaur_TiefladerCommand':'detailsHumbaur_TiefladerHandler',
            'reservierenHumbaur_TiefladerCommand':'reservierenHumbaur_TiefladerHandler',
          'Humbaur_PlanenanhaengerCommand':'Humbaur_PlanenanhaengerHandler',
            'detailsHumbaur_PlanenanhaengerCommand':'detailsHumbaur_PlanenanhaengerHandler',
            'reservierenHumbaur_PlanenanhaengerCommand':'reservierenHumbaur_PlanenanhaengerHandler',
          'Boeckmann_KipperCommand':'Boeckmann_KipperHandler',
            'detailsBckoemann_KipperCommand':'detailsBoeckmann_KipperHandler',
            'reservierenBoeckmann_KipperCommand':'reservierenBoeckmann_KipperHandler',
          };
      };
  }


module.exports = anhaengerController;
