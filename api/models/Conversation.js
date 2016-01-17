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
        if (conversations.length == 0) {
            return next();
        }
        conversations.forEach(function (conversation, i) {
            sails.log.info('destroy convs');
            //Remove conersation message
            sails.models.profile.destroy({
                conversation: conversation.id
            }).exec(function (err) {
                if (err) {
                    return next(err);
                }
                next();
            });
        });
    },
    /**
     * Find the pseudo of a conversation interlocutor
     * @param conversation a given conversation (object or id)
     * @param cb callback method
     */
    getConversationInterlocutorPseudo: function (conversation, cb) {
        (function _lookupProfileIfNecessary(afterLookup) {
            // (this self-calling function is just for concise-ness)
            if (typeof conversation === 'object')
                return afterLookup(null, conversation);
            Conversation.findOne(conversation).exec(afterLookup);
        })
        (function (err, conversation) {
            if (err || !conversation) {

                return cb(err, null);
            }
            Profile.findOne({owner: conversation.interlocutor}).exec(function (err, profile) {
                if (err || !profile) {
                    return cb(err, null);
                }
                cb(null, profile.firstname);
            });
        });
    }
};

