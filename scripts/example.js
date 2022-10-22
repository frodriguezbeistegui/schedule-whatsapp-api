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
    const second = '5,10,15,20,25,30,35,40,45,50,55,59' // optional
    const minute = '*'
    const hours = '*'
    const dayOfMoth = '*'
    const month = '*'
    const weekDay = '*'
    
    const messages = ['Estos mensajes se envian automaticamente cada 5 segundos', 'Yo solamente corri un comandito en la consola y puedo hacer que esto dure infinitamente', 'Capaz estas ocupada pero yo te voy a molestar un ratito', 'No me bloquees, es solo para mostrarte que si funciona', 'te puedo enviar esto infinitamente sin hacer nada', 'escribime a mi celu y lo corto', 'No se si esto ya lo escribi pero los mensajes se mandan aleatoreamente asi que puede que se repitan', 'Es bastante boludo pero esta bueno']
    // envia un mensaje cada 5 segundos (es simil cron, pero no es cron porque permite agregar segundos) 
    const job = schedule.scheduleJob(`${second ? second + ' ' : null}${minute} ${hours} ${dayOfMoth} ${month} ${weekDay}`, ()=>{ 
        // ingresa aun index random del array para seleccionar un mesanje diferente cada vez que se ejecuta
        const randomMessage = messages[Math.floor((Math.random()* messages.length))]
        //envia un mensaje a un numero de telefono
        sendMessages(randomMessage, 1122527572)
    })
}

example()