/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc       Handle delivery received from Facebook
  */

/*
	 * @desc      Handle delivery received from Facebook
	 * @param     event : Event from Facebook
	 * @return    void
	 */
var receivedDelivery = (event) => {
	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var delivery = event.delivery;
	var messageIDs = delivery.mids;
	var watermark = delivery.watermark;
	var sequenceNumber = delivery.seq;

	if (messageIDs) {
		messageIDs.forEach(function (messageID) {
			console.log("Received delivery confirmation for message ID: %s", messageID);
		});
	}

	console.log("All messages before %d were delivered.", watermark);
};

module.exports = {
  receivedDelivery
};
