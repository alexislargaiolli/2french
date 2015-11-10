/**
* NotificationSettings.js
*
* @description :: notification configuration of a user
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    owner: {
      model: 'User'
    },
    newReservation : {
      type: 'boolean',
      defaultsTo : true
    },
    reservationValidated : {
      type: 'boolean',
      defaultsTo : true
    },
    reservationCanceled : {
      type: 'boolean',
      defaultsTo : true
    },
    reviewToAdd : {
      type: 'boolean',
      defaultsTo : true
    },
    reviewAdded : {
      type: 'boolean',
      defaultsTo : true
    },
    newMessage : {
      type: 'boolean',
      defaultsTo : true
    }
  }
};

