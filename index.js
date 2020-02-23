var PORT = process.env.PORT || 5000;
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const verifyWebhook = require('./verify-webhook');

const app = express();
let VERIFY_TOKEN = 'EAAMG5Fcw2fkBALNvTsvqVUay1CBiwNwcQZBDDC1KWeoEqpHpAikIvFsx4XIBq8jIX4w7I1GsZAqrz7ZArWOcjd7TZCVTKZCtxHej1bHxt2uamGqvxtIipLEvfiwZCFUmTgxJULWyYN9OcHObdWjDFiHTnJ3ujYnbZAJ9c4MNCScXBTWrT5k6go6';
//cle secret cfb3d1f7d09e3cda5ec08eb192c35dcd
//id app 852002715261433+cfb3d1f7d09e3cda5ec08eb192c35dcd

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
                callSendAPI(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                //handlePostback(sender_psid, webhook_event.postback);
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
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "messaging_type": "RESPONSE",
     "message":{
     "text": "Pick a color:"      
       }
  }
   let typing_body = {
    "recipient": {
      "id": sender_psid
    },
    "sender_action":"typing_on"
  }
request({
     uri: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAAMG5Fcw2fkBALNvTsvqVUay1CBiwNwcQZBDDC1KWeoEqpHpAikIvFsx4XIBq8jIX4w7I1GsZAqrz7ZArWOcjd7TZCVTKZCtxHej1bHxt2uamGqvxtIipLEvfiwZCFUmTgxJULWyYN9OcHObdWjDFiHTnJ3ujYnbZAJ9c4MNCScXBTWrT5k6go6',
     method: 'POST',
     json: typing_on
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
  // Send the HTTP request to the Messenger Platform
  request({
     uri: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAAMG5Fcw2fkBALNvTsvqVUay1CBiwNwcQZBDDC1KWeoEqpHpAikIvFsx4XIBq8jIX4w7I1GsZAqrz7ZArWOcjd7TZCVTKZCtxHej1bHxt2uamGqvxtIipLEvfiwZCFUmTgxJULWyYN9OcHObdWjDFiHTnJ3ujYnbZAJ9c4MNCScXBTWrT5k6go6',
     method: 'POST',
     json: request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}

