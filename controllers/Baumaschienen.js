'use strict';

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
	    q: 'Bitte Emailadresse eingeben',
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



class kompaktbaggerController extends Telegram.TelegramBaseController  {

    bauHandler($) {

        $.sendMessage('Wähle eine Kategorie: \n/Kompaktbagger\n/Verdichtunstechnik\n/Anhaenger ')
    }

    kompaktbaggerHandler($) {

        $.sendMessage('Wählen Sie einen Kompaktbagger aus \n /KubotaU10 \t=1120kg\n /Takeuchi_Tb_216 \t=1755-1855 kg\n /KubotaKX61_3 \t=2485-2600 kg\n /KubotaKX71_3 \t=2685-2800 kg\n /KubotaKX101_3 \t=3485-3595 kg\n /KubotaKX121_3a \t=3980 kg\n /KubotaU55 \t=5400 kg\n /KomatsuPC138 \t=14.000 kg')
    }
      KubotaU10Handler($) {

          $.sendMessage('Details ansehen \n /DetailsKubotaU10 \n oder Reservieren \n /ReservierenKubotaU10')
      }

        detailsKubotaU10Handler($) {
            $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/KubotaU10.jpg?alt=media&token=51f1a07b-29c9-4306-9f81-2e309b5bc6bd', filename: 'KubotaU10.jpg'})
            $.sendMessage('HÖHÖE: 1655-2230 mm(Passt durch Garage) \nBREITE: 750-990mm \nGRABTIEFE: 1800mm \nEINSATZGEWICHT: 1120kg \nPREIS PRO TAG: 100,00€ \nVERSICHERUNG: 10,00€ \n oder /ReservierenKubotaU10')
        }

        reservierenKubotaU10Handler($) {
          $.runForm(form, (result) => {
             console.log(result)
             const artikel = 'Kubota U10'
             $.sendMessage('Kubota U10 wurde reserviert')
             mailer(result)}
          )}

      Takeuchitb216Handler($) {

          $.sendMessage('Details ansehen \n /DetailsTakeuchi_Tb_216 \n oder Reservieren \n /ReservierenTakeuchi_Tb_216')
      }

        detailsTakeuchitb216Handler($) {
            $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/Bildschirmfoto%202018-01-31%20um%2008.47.02.png?alt=media&token=484b8e4e-d145-4b08-8aae-d0e39c5ad1d1', filename: 'takeuchitb216.jpg'})
            $.sendMessage('HÖHÖE: 2330-2350 mm \nBREITE: 990-1300 mm \nGRABTIEFE: 2580 mm \nEINSATZGEWICHT: 1755-1855 kg \nPREIS PRO TAG: 110,00€ \nVERSICHERUNG: 10,00€ \n oder /ReservierenTakeuchi_Tb_216')
        }

        reservierenTakeuchitb216Handler($) {
          $.runForm(form, (result) => {
             console.log(result)
             const artikel = 'Takeuchi Tb 216'
             $.sendMessage('Takeuchi Tb 216 wurde reserviert')
             mailer(result, artikel)}
          )}

          KubotaKX613Handler($) {

              $.sendMessage('Details ansehen \n /DetailsKubotaKX61_3 \n oder Reservieren \n /ReservierenKubotaKX61_3')
          }

            detailsKubotaKX613Handler($) {
                $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/Kubota%20KX613.jpg?alt=media&token=3ae436d4-8a00-48f0-b402-70a2ec2d9c71', filename: 'KubotaKX613.jpg'})
                $.sendMessage('HÖHÖE: 2410 mm \nBREITE: 1400 mm \nGRABTIEFE: 2490/2740 mm \nEINSATZGEWICHT: 2485-2600 kg \nPREIS PRO TAG: 130,00€ \nVERSICHERUNG: 10,00€ \n oder /ReservierenKubotaKX61_3')
            }

            reservierenKubotaKX613Handler($) {
              $.runForm(form, (result) => {
                 console.log(result)
                 const artikel = 'Kubota KX61-3'
                 $.sendMessage('Kubota KX61-3 wurde reserviert')
                 mailer(result, artikel)}
              )}
              KubotaKX713Handler($) {

                  $.sendMessage('Details ansehen \n /DetailsKubotaKX71_3 \n oder Reservieren \n /ReservierenKubotaKX71_3')
              }

              detailsKubotaKX713Handler($) {
                  $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/KubotaKX713.jpg?alt=media&token=0ae1b88b-51d1-4a0a-a9ba-2ea38f85b8c8', filename: 'KubotaKX713.jpg'})
                  $.sendMessage('HÖHÖE: 2410 mm \nBREITE: 1500 mm \nGRABTIEFE: 2680/2870 mm \nEINSATZGEWICHT: 2685-2800 kg \nPREIS: 130,00€ \nVERSICHERUNG: 10,00€ \n oder /ReservierenKubotaKX71_3')
              }

              reservierenKubotaKX713Handler($) {
                $.runForm(form, (result) => {
                   console.log(result)
                   const artikel = 'Kubota KX71-3'
                   $.sendMessage('Kubota KX71-3 wurde reserviert')
                   mailer(result, artikel)}
                )}
                KubotaKX1013Handler($) {

                    $.sendMessage('Details ansehen \n /DetailsKubotaKX101_3 \n oder Reservieren \n /ReservierenKubotaKX101_3')
                }

                detailsKubotaKX1013Handler($) {
                    $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/Kubota%20KX101-3.jpg?alt=media&token=04368960-6e3d-4f51-a0c7-faa8b8ed998b', filename: 'KubotaKX1013.jpg'})
                    $.sendMessage('HÖHÖE: 2440 mm \nBREITE: 1550 mm \nGRABTIEFE: 3100/3300 mm \nEINSATZGEWICHT: 3485-3595 kg \nPREIS PRO TAG: 140,00€ \nVERSICHERUNG: 10,00€ \n oder /ReservierenKubotaKX101_3')
                }

              reservierenKubotaKX1013Handler($) {
                $.runForm(form, (result) => {
                   console.log(result)
                   const artikel = 'Kubota KX101-3'
                   $.sendMessage('Kubota KX101-3 wurde reserviert')
                   mailer(result, artikel)}
                )}
                KubotaKX1213aHandler($) {

                    $.sendMessage('Details ansehen \n /DetailsKubotaKX121_3a \n oder Reservieren \n /ReservierenKubotaKX121_3a')
                }

                  detailsKubotaKX1213aHandler($) {
                      $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/Kubota%20KX121-3a.jpg?alt=media&token=4a1f179a-574a-45cd-9e8d-b7aedb36e126', filename: 'KubotaKX1213a.jpg'})
                      $.sendMessage('HÖHÖE: 2490 mm \nBREITE: 1700 mm \nGRABTIEFE: 3210/3510 mm \nEINSATZGEWICHT: 3980 kg \nPREIS PRO TAG: 145,00€ \nVERSICHERUNG: 10,00€ \n oder /ReservierenKubotaKX121_3a')
                  }

                  reservierenKubotaKX1213aHandler($) {
                    $.runForm(form, (result) => {
                       console.log(result)
                       const artikel = 'Kubota KX121-3a'
                       $.sendMessage('Kubota KX121-3a wurde reserviert')
                       mailer(result, artikel)}
                    )}
                    KubotaU55Handler($) {

                        $.sendMessage('Details ansehen \n /DetailsKubotaU55 \n oder Reservieren \n /ReservierenKubotaU55')
                    }

                      detailsKubotaU55Handler($) {
                          $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/Kubota%20U55.jpg?alt=media&token=4a741378-7860-49c9-be88-064a5e374d9d', filename: 'KubotaU55.jpg'})
                          $.sendMessage('HÖHÖE: 2550 mm \nBREITE: 1960 mm \nGRABTIEFE: 3630 mm \nEINSATZGEWICHT: 5400 kg \nPREIS PRO TAG: auf Anfrage \nVERSICHERUNG: 10,00€ \n oder /ReservierenKubotaU55')
                      }

                      reservierenKubotaU55Handler($) {
                        $.runForm(form, (result) => {
                           console.log(result)
                           const artikel = 'Kubota U55'
                           $.sendMessage('Kubota U55 wurde reserviert')
                           mailer(result, artikel)}
                        )}
                    KomatsuPC138Handler($) {

                        $.sendMessage('Details ansehen \n /DetailsKomatsuPC138 \n oder Reservieren \n /ReservierenKomatsuPC138')
                    }

                      detailsKomatsuPC138Handler($) {
                          $.sendPhoto({ url: 'https://firebasestorage.googleapis.com/v0/b/fir-a7412.appspot.com/o/Komatsu%20PC138.png?alt=media&token=f49ac5e9-7e36-4796-a64c-0732dfa06a2f', filename: 'KomatsuPC138.png'})
                          $.sendMessage('HÖHÖE: 2815 mm \nBREITE: 2.490 mm \nGRABTIEFE: 5.070 mm \nEINSATZGEWICHT: 14.000 kg \nPREIS PRO TAG: auf Anfrage \nVERSICHERUNG: 10,00€ \n oder /ReservierenKomatsuPC138')
                      }

                      reservierenKomatsuPC138Handler($) {
                        $.runForm(form, (result) => {
                           console.log(result)
                           const artikel = 'Komatsu PC138'
                           $.sendMessage('Komatsu PC138 wurde reserviert')
                           mailer(result, artikel)}
                        )}


    get routes() {
        return {
            'bauCommand': 'bauHandler',
            'kompaktbaggerCommand':'kompaktbaggerHandler',
              'KubotaU10Command':'KubotaU10Handler',
                'detailsKubotaU10Command':'detailsKubotaU10Handler',
                'reservierenKubotaU10Command':'reservierenKubotaU10Handler',
              'Takeuchitb216Command':'Takeuchitb216Handler',
                'detailsTakeuchitb216Command':'detailsTakeuchitb216Handler',
                'reservierenTakeuchitb216Command':'reservierenTakeuchitb216Handler',
              'KubotaKX613Command':'KubotaKX613Handler',
                'detailsKubotaKX613Command':'detailsKubotaKX613Handler',
                'reservierenKubotaKX613Command':'reservierenKubotaKX613Handler',
              'KubotaKX713Command':'KubotaKX713Handler',
                'detailsKubotaKX713Command':'detailsKubotaKX713Handler',
                'reservierenKubotaKX713Command':'reservierenKubotaKX713Handler',
              'KubotaKX1013Command':'KubotaKX1013Handler',
                'detailsKubotaKX1013Command':'detailsKubotaKX1013Handler',
                'reservierenKubotaKX1013Command':'reservierenKubotaKX1013Handler',
              'KubotaKX1213aCommand':'KubotaKX1213aHandler',
                'detailsKubotaKX1213aCommand':'detailsKubotaKX1213aHandler',
                'reservierenKubotaKX1213aCommand':'reservierenKubotaKX1213aHandler',
              'KubotaU55Command':'KubotaU55Handler',
                'detailsKubotaU55Command':'detailsKubotaU55Handler',
                'reservierenKubotaU55Command':'reservierenKubotaU55Handler',
              'KomatsuPC138Command':'KomatsuPC138Handler',
                'detailsKomatsuPC138Command':'detailsKomatsuPC138Handler',
                'reservierenKomatsuPC138Command':'reservierenKomatsuPC138Handler',


        };
    }
}
module.exports = kompaktbaggerController;
