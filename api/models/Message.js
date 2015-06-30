/**
* Message.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    author: {
      model: 'User'
    },
    recipient: {
      model: 'User'
    },
    content: {
      type: 'string'
    },
    date:{
      type : 'date',
      defaultsTo: new Date()
    },
    read:{
      type: 'boolean',
      defaultsTo : false
    },
    conversation:{
      model :'conversation'
    }
  }
};

