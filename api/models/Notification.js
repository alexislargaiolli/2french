/**
* Notification.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    owner: {
      model: 'User'
    },
    type: {
      type: 'string',
      enum: ['resa', 'message']
    },
    reservation: {
      model: 'Reservation'
    },
    conversation: {
      model: 'Conversation'
    },
    seen:{
      type : 'boolean',
      defaultsTo: false
    },
    date:{
      type: 'date',
      defaultsTo: new Date()
    }
  }
};

