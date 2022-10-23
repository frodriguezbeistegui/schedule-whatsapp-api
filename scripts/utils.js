const axios = require('axios');
const schedule = require('node-schedule');

// this function sends messages to argentinian phone numbers

class SendMessages{

  sendMessage = (message, phoneNumber) => {
      axios.post(`http://localhost:5000/chat/sendmessage/549${phoneNumber}`, {
        message
      })
        .then(function () {
          console.log(`${message}sent to ${phoneNumber}`);
          })
        .catch(function (error) {
          console.log(error);
        });
  }

  singleMessage = ({message, phoneNumber, cronConf}) => {
    const job = schedule.scheduleJob(`${cronConf.second ? cronConf.second + ' ' : null}${cronConf.minute} ${cronConf.hours} ${cronConf.dayOfMoth} ${cronConf.month} ${cronConf.weekDay}`,
    ()=>{ 
      //envia un mensaje a un numero de telefono
      this.sendMessage(message, phoneNumber)
    })
  }

  multipleMessages =  ({messagesArr, phoneNumber, cronConf}) => {
    const job = schedule.scheduleJob(`${cronConf.second ? cronConf.second + ' ' : null}${cronConf.minute} ${cronConf.hours} ${cronConf.dayOfMoth} ${cronConf.month} ${cronConf.weekDay}`, ()=>{ 
      //envia un mensaje a un numero de telefono
      for (let message of messagesArr){
      setTimeout(()=>{ this.sendMessage(message, phoneNumber)}, 1000)
      }
    })
  }

  RandomInArray = ({messagesArr, phoneNumber, cronConf}) => {
    const job = schedule.scheduleJob(`${cronConf.second ? cronConf.second + ' ' : null}${cronConf.minute} ${cronConf.hours} ${cronConf.dayOfMoth} ${cronConf.month} ${cronConf.weekDay}`, ()=>{ 
      // ingresa aun index random del array para seleccionar un mesanje diferente cada vez que se ejecuta
      const randomMessage = messagesArr[Math.floor((Math.random()* messagesArr.length))]
      //envia un mensaje a un numero de telefono
      this.sendMessage(randomMessage, phoneNumber)
    })
  }
}

const send = new SendMessages()

send.singleMessage({
message: 'Hola sofi, este mensaje lo escribi a las 11:37',
 phoneNumber: 11111111, 
cronConf: {
  // useful resource: https://crontab.guru/
  hours: '12',
  minute: '0',
  second: '0',
  dayOfMoth: '23',
  month: '10',
  weekDay: '*',
}
})

// sendRandomInArray( {
// messagesArr: ['test message 1', 'test message 2', 'test message 3', 'test message 4', 'test message 5', 'test message 6'],
//  phoneNumber: 111111111,
// cronConf: {
//   // useful resource: https://crontab.guru/
//   second: '0,5,10,15,20,25,30,35,40,45,50,55', // optional
//   minute: '*',
//   hours: '*',
//   dayOfMoth: '*',
//   month: '*',
//   weekDay: '*',
// }}
// )

// sendMultipleMessages({messagesArr: ['hola', 'chofi', 'como', 'estas?', 'esto es una sola ejecucion'],
// phoneNumber: 1111111111,
// cronConf: {
//   // useful resource: https://crontab.guru/
//   second: '0,10,20,30,40,50', // optional
//   minute: '*',
//   hours: '*',
//   dayOfMoth: '*',
//   month: '*',
//   weekDay: '*',
// }})