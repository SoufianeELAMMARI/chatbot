
// Variable indicating if the bot is waiting for
var waitingForAnswer = false;

/*
  * @desc      Sets waiting indicator to true
  * @return    void
  */
var setWaiting = () => {
  waitingForAnswer = true;
};

/*
  * @desc      Sets waiting indicator to false
  * @return    void
  */
var setNotWaiting = () => {
  waitingForAnswer = false;
};

/*
  * @desc      Gets the value of waiting indicator
  * @return    Boolean
  */
var getWaiting = () => waitingForAnswer;


module.exports = {
  setWaiting,
  setNotWaiting,
  getWaiting
};
