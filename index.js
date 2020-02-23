var PORT = process.env.PORT || 5000;
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const verifyWebhook = require('./verify-webhook');
const {setNotWaiting,getWaiting}  = require('./waiting');

const app = express();
let FB_PAGE_TOKEN = 'EAAMG5Fcw2fkBALNvTsvqVUay1CBiwNwcQZBDDC1KWeoEqpHpAikIvFsx4XIBq8jIX4w7I1GsZAqrz7ZArWOcjd7TZCVTKZCtxHej1bHxt2uamGqvxtIipLEvfiwZCFUmTgxJULWyYN9OcHObdWjDFiHTnJ3ujYnbZAJ9c4MNCScXBTWrT5k6go6';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(PORT, () => console.log('Express server is listening on port ',PORT));
app.get('/', (req, res) => {
	res.send('Hello I am a chatbot')
});

app.get('/webhook', verifyWebhook);

// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {
    console.log('req: ' + req.body);

    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {

            // Gets the message. entry.messaging is an array, but
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
            // The bot is no longer waiting for answer
                SendMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
              //handlePostback(sender_psid, webhook_event.postback);
            } else if (webhook_event.read) {
               
              //receivedSeen(event);
            } else if (webhook_event.delivery) {
              //receivedDelivery(event);
            } else {
              console.log("Webhook received unknown event : ", event);
            }
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});

// Sends response messages via the Send API
function SendMessage(sender_psid, message) {
  // Construct the message body
  let action="typing_on";
  let messageData = {
    "recipient": {
      "id": sender_psid
    },
    "messaging_type": "RESPONSE",
     "message":{
     "text": "heeey"     
       }
  }

  sendAction(sender_psid,action);
  setTimeout(() => {
    callSendAPI(messageData);
  }, 5000);

}

// Sends response messages via the Send API
function sendAction(sender_psid, action) {
  // Construct the message body
  let messageData = {
    "recipient": {
      "id": sender_psid
    },
    "sender_action":action 
       }
  callSendAPI(messageData);
}

var callSendAPI = (messageData) => {
  // We are using request package to send HTTP request to FB API
  request({
     uri: 'https://graph.facebook.com/v2.6/me/messages',
     qs: {
       access_token: FB_PAGE_TOKEN
     },
     method: 'POST',
     json: messageData
   }, (error, response, body) => {
     if (!error && response.statusCode === 200) {

       var recipientID = body.recipient_id;
       var messageID = body.message_id;
     } else {
       console.error(`#### Message sent errors ####`);
       console.error(error);
     }

  });
};