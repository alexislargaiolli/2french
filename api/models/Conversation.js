/**
 * Conversation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        owner: {
            model: 'user',
        },
        interlocutor: {
            model: 'user',
        },
        unseenCount: {
            type: 'integer',
            defaultsTo: 0
        },
        messages: {
            collection: 'message',
            via: 'conversation'
        }
    },
    afterDestroy: function (conversations, next) {
        conversations.forEach(function (conversation, i) {

            //Remove conersation message
            sails.models.profile.destroy({
                conversation: conversation.id
            }).exec(function (err) {
                next();
            });
        });
    }
};

