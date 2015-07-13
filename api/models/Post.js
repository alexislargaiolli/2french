/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    date : {
      type : 'date',
      defaultsTo: new Date()
    },
    teacher:{
      type:'boolean',
      defaultsTo:false
    },
    category:{
      model : 'PostCategory'
    },
    author : {
      model : 'Profile'
    },
    title: 'string',
    content : 'string',
    locale : {
      model : 'Locale'
    },
    files : 'array',
    seenCount :{
      type:'integer',
      defaultsTo: 0
    },
    likeCount : {
      type:'integer',
      defaultsTo: 0
    },
    downloadCount : {
      type:'integer',
      defaultsTo: 0
    },
    comments:{
      collection : 'Comment',
      via : 'post'
    }
  }

};

