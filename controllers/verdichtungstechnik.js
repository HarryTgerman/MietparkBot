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

class verdichtungsController extends Telegram.TelegramBaseController  {

  verdichtunsHandler($) {
      $.sendMessage('Wähle zwischen \n/Stampfer oder \n/Vibrationsplatte')
  }
  stampferHandler($) {
      $.sendMessage('Wähle einen Stampfer \n/BOMAG_BT60 \t=58kg \n/BOMAG_BT65 \t=68kg')
  }
  BOMAG_BT60Handler($) {

      $.sendMessage('Details ansehen \n /DetailsBOMAG_BT60 \n oder Reservieren \n /ReservierenBOMAG_BT60')
  }

    detailsBOMAG_BT60Handler($) {
        $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/BOMAG_BT60.jpg?alt=media&token=68771ea0-0002-438c-88e7-c9aa2e494695', filename: 'BOMAG_BT60.jpg'})
        $.sendMessage('GEWICHT: 58kg \nARBEITSBREITE: 230mm \nKRAFTSTOFF: Benzin \nGUMMIMATTE: Nein \nPREIS PRO TAG: 30,00€ \n oder /ReservierenBOMAG_BT60')
    }

    reservierenBOMAG_BT60Handler($) {
      $.runForm(form, (result) => {
         console.log(result)
         const artikel = 'BOMAG BT60'
         $.sendMessage('BOMAG BT60 wurde reserviert')
         mailer(result)}
      )}
      BOMAG_BT65Handler($) {

          $.sendMessage('Details ansehen \n /DetailsBOMAG_BT65 \n oder Reservieren \n /ReservierenBOMAG_BT65')
      }

        detailsBOMAG_BT65Handler($) {
            $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/BOMAG_BT65.jpg?alt=media&token=5170d599-fa31-47d0-a616-346048eb270f', filename: 'BOMAG_BT65.jpg'})
            $.sendMessage('GEWICHT: 68kg \nARBEITSBREITE: 280mm \nKRAFTSTOFF: Benzin \nGUMMIMATTE: Nein \nPREIS PRO TAG: 34,00€\n oder /ReservierenBOMAG_BT65')
        }

        reservierenBOMAG_BT65Handler($) {
          $.runForm(form, (result) => {
             console.log(result)
             const artikel = 'BOMAG BT65'
             $.sendMessage('BOMAG BT65 wurde reserviert')
             mailer(result)}
          )}

          vibrationsplatteHandler($) {
              $.sendMessage('Wähle eine Vibrationsplatte \n/BOMAG_BP1035 \t=65kg\n/BOMAG_BP2050\t=95kg\n/BOMAG_BPR2540 \t=135kg\n/BOMAG_BPR3560D \t=225kg\n/BOMAG_BPR6065D \t=500kg\n/BOMAG_BPR7070D \t=750kg')
          }

          BOMAG_BP1035Handler($) {

              $.sendMessage('Details ansehen \n /DetailsBOMAG_BP1035 \n oder Reservieren \n /ReservierenBOMAG_BP1035')
          }

            detailsBOMAG_BP1035Handler($) {
                $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/BOMAG_BP10%3A35.jpg?alt=media&token=e2fdc79c-26e8-4215-8b6f-dc8c5a287872', filename: 'BOMAG_BP1035.jpg'})
                $.sendMessage('GEWICHT: 65kg	 \nARBEITSBREITE: 350mm \nKRAFTSTOFF: Benzin \nGUMMIMATTE: Ja \nPREIS PRO TAG: 25,00€ \n oder /ReservierenBOMAG_BP1035')
            }

            reservierenBOMAG_BP1035Handler($) {
              $.runForm(form, (result) => {
                 console.log(result)
                 const artikel = 'BOMAG BP10/35'
                 $.sendMessage('BOMAG BP10/35 wurde reserviert')
                 mailer(result)}
              )}

              BOMAG_BP2050Handler($) {

                  $.sendMessage('Details ansehen \n /DetailsBOMAG_BP2050 \n oder Reservieren \n /ReservierenBOMAG_BP2050')
              }

                detailsBOMAG_BP2050Handler($) {
                    $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/BOMAG%20BP20%3A50%20.jpg?alt=media&token=4e7f5148-85a3-4996-bab2-0cb1eea5d389', filename: 'BOMAG_BP2050.jpg'})
                    $.sendMessage('GEWICHT: 95kg	 \nARBEITSBREITE: 500mm \nKRAFTSTOFF: Benzin \nGUMMIMATTE: Ja \nPREIS PRO TAG: 30,00€ \n oder /ReservierenBOMAG_BP2050')
                }

                reservierenBOMAG_BP2050Handler($) {
                  $.runForm(form, (result) => {
                     console.log(result)
                     const artikel = 'BOMAG BP20/50'
                     $.sendMessage('BOMAG BP20/50 wurde reserviert')
                     mailer(result)}
                  )}

              BOMAG_BPR2540Handler($) {

                  $.sendMessage('Details ansehen \n /DetailsBOMAG_BPR2540 \n oder Reservieren \n /ReservierenBOMAG_BPR2540')
              }

                detailsBOMAG_BPR2540Handler($) {
                    $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/BOMAG%20BPR25%3A40.jpg?alt=media&token=56995307-9b02-4048-b62a-4c990ca310c3', filename: 'BOMAG_BPR2540.jpg'})
                    $.sendMessage('GEWICHT: 135kg	 \nARBEITSBREITE: 400mm \nKRAFTSTOFF: Benzin \nGUMMIMATTE: Ja \nPREIS PRO TAG: 35,00€ \n oder /ReservierenBOMAG_BPR2540')
                }

                reservierenBOMAG_BPR2540Handler($) {
                  $.runForm(form, (result) => {
                     console.log(result)
                     const artikel = 'BOMAG BPR25/40'
                     $.sendMessage('BOMAG BPR25/40 wurde reserviert')
                     mailer(result)}
                  )}
              BOMAG_BPR3560DHandler($) {

                  $.sendMessage('Details ansehen \n /DetailsBOMAG_BPR3560D \n oder Reservieren \n /ReservierenBOMAG_BPR3560D')
              }

                detailsBOMAG_BPR3560DHandler($) {
                    $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/BOMAGBPR35%3A60D.jpg?alt=media&token=9b1df4c4-c07c-49be-b324-ae4f2b7c63bc', filename: 'BOMAG_BPR3560D.jpg'})
                    $.sendMessage('GEWICHT: 225kg	 \nARBEITSBREITE: 600mm \nKRAFTSTOFF: Diesel \nGUMMIMATTE: Ja \nPREIS PRO TAG: 40,00€ \n oder /ReservierenBOMAG_BPR3560D')
                }

                reservierenBOMAG_BPR3560DHandler($) {
                  $.runForm(form, (result) => {
                     console.log(result)
                     const artikel = 'BOMAG BPR35/60D'
                     $.sendMessage('BOMAG BPR35/60D wurde reserviert')
                     mailer(result)}
                  )}
            BOMAG_BPR6065DHandler($) {

                $.sendMessage('Details ansehen \n /DetailsBOMAG_BPR6065D \n oder Reservieren \n /ReservierenBOMAG_BPR6065D')
            }

              detailsBOMAG_BPR6065DHandler($) {
                  $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/BOMAG%20BPR60%3A65D.jpg?alt=media&token=57ba1964-ae68-4432-b4a5-ef8131579e63', filename: 'BOMAG_BPR6065D.jpg'})
                  $.sendMessage('GEWICHT: 500kg	 \nARBEITSBREITE: 450mm - 750mm \nKRAFTSTOFF: Diesel \nGUMMIMATTE: Nein \nPREIS PRO TAG: 60,00€ \n oder /ReservierenBOMAG_BPR6065D')
              }

              reservierenBOMAG_BPR6065DHandler($) {
                $.runForm(form, (result) => {
                   console.log(result)
                   const artikel = 'BOMAG BPR60/65D'
                   $.sendMessage('BOMAG BPR60/65D wurde reserviert')
                   mailer(result)}
                )}
            BOMAG_BPR7070DHandler($) {

                $.sendMessage('Details ansehen \n /DetailsBOMAG_BPR7070D \n oder Reservieren \n /ReservierenBOMAG_BPR7070D')
            }

              detailsBOMAG_BPR7070DHandler($) {
                  $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/BOMAG%20BPR70%3A70D.jpg?alt=media&token=cd3d65ee-610c-45b6-8406-a0aec1d8aa73', filename: 'BOMAG_BPR7070D.jpg'})
                  $.sendMessage('GEWICHT: 750kg	 \nARBEITSBREITE: 550mm - 850mm \nKRAFTSTOFF: Diesel \nGUMMIMATTE: Nein \nPREIS PRO TAG: 70,00€ \n oder /ReservierenBOMAG_BPR7070D')
              }

              reservierenBOMAG_BPR7070DHandler($) {
                $.runForm(form, (result) => {
                   console.log(result)
                   const artikel = 'BOMAG BPR70/70D'
                   $.sendMessage('BOMAG BPR70/70D wurde reserviert')
                   mailer(result)}
                )}

  get routes() {
      return {
          'verdichtunsCommand': 'verdichtunsHandler',
          'stampferCommand': 'stampferHandler',
          'vibrationsplatteCommand': 'vibrationsplatteHandler',
          'BOMAG_BT60Command':'BOMAG_BT60Handler',
            'detailsBOMAG_BT60Command':'detailsBOMAG_BT60Handler',
            'reservierenBOMAG_BT60Command':'reservierenBOMAG_BT60Handler',
          'BOMAG_BT65Command':'BOMAG_BT65Handler',
            'detailsBOMAG_BT65Command':'detailsBOMAG_BT65Handler',
            'reservierenBOMAG_BT65Command':'reservierenBOMAG_BT65Handler',
          'BOMAG_BP1035Command':'BOMAG_BP1035Handler',
            'detailsBOMAG_BP1035Command':'detailsBOMAG_BP1035Handler',
            'reservierenBOMAG_BP1035Command':'reservierenBOMAG_BP1035Handler',
          'BOMAG_BP2050Command':'BOMAG_BP2050Handler',
            'detailsBOMAG_BP2050Command':'detailsBOMAG_BP2050Handler',
            'reservierenBOMAG_BP2050Command':'reservierenBOMAG_BP2050Handler',
          'BOMAG_BPR2540Command':'BOMAG_BPR2540Handler',
            'detailsBOMAG_BPR2540Command':'detailsBOMAG_BPR2540Handler',
            'reservierenBOMAG_BPR2540Command':'reservierenBOMAG_BPR2540Handler',
          'BOMAG_BPR3560DCommand':'BOMAG_BPR3560DHandler',
            'detailsBOMAG_BPR3560DCommand':'detailsBOMAG_BPR3560DHandler',
            'reservierenBOMAG_BPR3560DCommand':'reservierenBOMAG_BPR3560DHandler',
          'BOMAG_BPR6065DCommand':'BOMAG_BPR6065DHandler',
            'detailsBOMAG_BPR6065DCommand':'detailsBOMAG_BPR6065DHandler',
            'reservierenBOMAG_BPR6065DCommand':'reservierenBOMAG_BPR6065DHandler',
          'BOMAG_BPR7070DCommand':'BOMAG_BPR7070DHandler',
            'detailsBOMAG_BPR7070DCommand':'detailsBOMAG_BPR7070DHandler',
            'reservierenBOMAG_BPR7070DCommand':'reservierenBOMAG_BPR7070DHandler',

      };
  }
}

module.exports = verdichtungsController;
