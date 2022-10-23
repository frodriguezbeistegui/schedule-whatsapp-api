const axios = require('axios');
const schedule = require('node-schedule');



// UTILS
const sendMessage = (message, phoneNumber) => {
  // this function sends messages to argentinian phone numbers
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

// FUNCTIONS EXAMPLE  
// all functions expect an object with a message or array of messages,
// a phone number to send messages to
// and a cronConf object to configure the schedule

// get a message and a phone number and send it at determinate schedule
const singleMessage = ({message, phoneNumber, cronConf}) => {
  const job = schedule.scheduleJob(`${cronConf.second ? cronConf.second + ' ' : ''}${cronConf.minute} ${cronConf.hours} ${cronConf.dayOfMoth} ${cronConf.month} ${cronConf.weekDay}`,
  ()=>{ 
    sendMessage(message, phoneNumber)
  })
}


// get an array of messages and send them separately
const multipleMessages =  ({messagesArr, phoneNumber, cronConf}) => {
  const job = schedule.scheduleJob(`${cronConf.second ? cronConf.second + ' ' : null}${cronConf.minute} ${cronConf.hours} ${cronConf.dayOfMoth} ${cronConf.month} ${cronConf.weekDay}`,
    ()=>{  
      for (let message of messagesArr){
        setTimeout(()=>{ sendMessage(message, phoneNumber)}, 1000)
      }
    })
}

// get an array of messages and sends one of them randomly 
const randomInArray = ({messagesArr, phoneNumber, cronConf}) => {
  const job = schedule.scheduleJob(`${cronConf.second ? cronConf.second + ' ' : null}${cronConf.minute} ${cronConf.hours} ${cronConf.dayOfMoth} ${cronConf.month} ${cronConf.weekDay}`, ()=>{ 
  const randomMessage = messagesArr[Math.floor((Math.random()* messagesArr.length))]
  sendMessage(randomMessage, phoneNumber)
  })
}



  // EXECUTIONS

// singleMessage({
//   message: 'Que onda martin',
//   phoneNumber: 3517452200, 
//   cronConf: {
//     // useful resource: https://crontab.guru/
//     hours: '*',
//     minute: '*',
//     second: '0,5,10,15,20,25,30,35,40,45,50,55',
//     dayOfMoth: '*',
//     month: '*',
//     weekDay: '*',
//   }
// })

// sendRandomInArray( {
// messagesArr: ['random message 1', 'random message 2', 'random message 3', 'random message 4', 'random message 5', 'random message 6'],
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
multipleMessages({messagesArr: ['test message 1', 'test message 2', 'test message 3', 'test message 4', 'test message 5', 'test message 6'],
phoneNumber: 3517452200,
cronConf: {
  // useful resource: https://crontab.guru/
  second: '0,5,10,15,20,25,30,35,40,45,50,55', // optional
  minute: '*',
  hours: '*',
  dayOfMoth: '*',
  month: '*',
  weekDay: '*',
}})
