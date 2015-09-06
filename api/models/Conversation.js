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
        if(conversations.length == 0){
            return next();
        }
        conversations.forEach(function (conversation, i) {
            sails.log.info('destroy convs');
            //Remove conersation message
            sails.models.profile.destroy({
                conversation: conversation.id
            }).exec(function (err) {
                if(err){
                    return next(err);
                }
                next();
            });
        });
    }
};

