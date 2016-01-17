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
            enum: ['resa', 'message', 'forum']
        },
        reservation: {
            model: 'Reservation'
        },
        conversation: {
            model: 'Conversation'
        },
        post: {
            model: 'Post'
        },
        seen: {
            type: 'boolean',
            defaultsTo: false
        },
        date: {
            type: 'date',
            defaultsTo: new Date()
        }
    },

    /**
     * Find the user name of notification conversation
     * @param notification the notification to process
     * @param cb callback method
     */
    processConversation: function (notification, cb) {
        Conversation.getConversationInterlocutorPseudo(notification.conversation, function(err, pseudo){
            notification.interlocutor = pseudo;
            notification.conversation = notification.conversation.id;
            cb(err, notification);
        });
    },

    /**
     * Set extra data for reservation
     * @param notification
     * @param cb
     */
    processReservation: function (notification, cb) {
        notification.history = notification.reservation.isOver();
        notification.status = notification.reservation.status;
        notification.reservation = notification.reservation.id;
        cb(null, notification);
    }
};

