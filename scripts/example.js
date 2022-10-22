const axios = require('axios');
const schedule = require('node-schedule');

// this function sends messages to argentinian phone numbers
const sendMessages = (message, phoneNumber) => {
    axios.post(`http://localhost:5000/chat/sendmessage/549${phoneNumber}`, {
      message
    })
      .then(function (response) {
        console.log();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

}

const example = () => {
    // useful resource: https://crontab.guru/
    const second = '0,5,10,15,20,25,30,35,40,45,50,55' // optional
    const minute = '*'
    const hours = '*'
    const dayOfMoth = '*'
    const month = '*'
    const weekDay = '*'
    
    const messages = ['test message 1', 'test message 2', 'test message 3', 'test message 4', 'test message 5', 'test message 6']
    // envia un mensaje cada 5 segundos (es simil cron, pero no es cron porque permite agregar segundos) 
    const job = schedule.scheduleJob(`${second ? second + ' ' : null}${minute} ${hours} ${dayOfMoth} ${month} ${weekDay}`, ()=>{ 
        // ingresa aun index random del array para seleccionar un mesanje diferente cada vez que se ejecuta
        const randomMessage = messages[Math.floor((Math.random()* messages.length))]
        //envia un mensaje a un numero de telefono
        sendMessages(randomMessage, 3585268935)
    })
}

example()