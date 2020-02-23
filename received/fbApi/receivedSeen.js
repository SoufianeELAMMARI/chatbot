/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        When the user sees any message sent by the application, the function in this file is called
  */
const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');
const {getWaiting} = require('./../../utils/waiting');

/*
  * @desc      Seen event handler
  * @param     event : event from Facebook
  * @return    void
  */
var receivedSeen = (event) => {
  var senderID = event.sender.id;
  // The timestamp is the time of the event reception
  var eventTime = event.timestamp;
  // The watermark is the time when the user has seen the message
  var waterMark = event.read.watermark;

  console.log(`Messages to ${senderID} are all seen at ${waterMark}.`);

  // If we are witing for an answer, begin counting seconds
  if (getWaiting()) {
    setTimeout(() => {
      if (getWaiting()) {

        // if after counting the bot is still waiting, prompt user
        console.log('Timeout, user will be propmted again');
        sendTextMessage(event.sender.id, 'J\'attends toujours votre réponse !?');

        setNotWaiting();
      }
      else {

        console.log('BOT is not longer waiting');
      }
    }, WAITING_BEFORE_PROMPT);
  }
  else {

    console.log(`Nothing to do because waiting is ${getWaiting()}`);
  }
};


module.exports = {
  receivedSeen
};
