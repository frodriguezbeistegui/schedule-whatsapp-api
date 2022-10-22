To use this app enter to the root project and run npm start in the console, this will open a http server on port 5000.
then,

go to http://localhost:5000/auth/getqr, this will crate a qr code in components/last.qr.


go to http://localhost:5000/auth/checkauth to verify if your status is connected.

if you run issues with this delete components/last.qr file and try again.
if you run issues with the http server try to remove and install whatsapp-web.js library.

all this process is explained nicely in the following article.
https://medium.com/react-courses/send-messages-with-whatsapp-using-node-express-free-in-less-than-5-minutes-c49e6215d948

then execute corresponding script to schedule the actions you want using node scripts/example.js in a different console
