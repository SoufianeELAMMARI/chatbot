var PORT = process.env.PORT || 5000;

const express = require('express');
const bodyParser = require('body-parser');
 const verifyWebhook = require('./verify-webhook');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(PORT, () => console.log('Express server is listening on port ',PORT));
app.get('/', verifyWebhook);

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
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});

//EAAMG5Fcw2fkBADD1rt5f6dzaDrbbrjKTimmDQCZBZCUkDuNxJJGMAejcfcyNwiEjDTiDSbNn9YO5QWjKXYObRpMQFZCDkInZABNg6CxCU1fLm6ZCko1kNPt28VKthlupgIMQtTUeuSni01wO3HiYG6bEeN5J8azSXkZA1IDrYAStUecsBGZAtsf