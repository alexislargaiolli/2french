/**
 * Created by alex on 15/11/15.
 */
module.exports = {
    createResaNotification: function (userId, resaId, callback) {
        Notification.create({owner: userId, type: 'resa', reservation: resaId}).exec(callback);
    },

    removeResaNotification: function (userId, resaId, callback) {
        /*Notification.destroy({owner: userId, type: 'resa', reservation: resaId}).exec(callback);*/
    },

    seenResaNotification: function (userId, resaId, callback) {
        Notification.update({owner: userId, type: 'resa', reservation: resaId}, {seen: true}).exec(callback);
    },

    createNewMessageNotification: function (userId, conversationId, callback) {
        Notification.create({owner: userId, type: 'message', conversation: conversationId}).exec(callback);
    },

    seenMessageNotification: function (userId, conversationId, callback) {
        Notification.update({
            owner: userId,
            type: 'message',
            conversation: conversationId
        }, {seen: true}).exec(callback);
    },

    removeMessageNotification: function (userId, conversationId, callback) {
        /*Notification.destroy({owner: userId, type: 'message', conversation: conversationId}).exec(callback);*/
    },

    createForumNotification: function (userId, postId, callback) {
        Notification.create({owner: userId, type: 'forum', post: postId}).exec(callback);
    },

    createForumNotificationToAllTeacher: function (postId, callback) {
        Profile.findValidated(function(err, teachers){
            if(err){
                return;
            }
            teachers.forEach(function(teacher){
                sails.log.debug('Notif createad ' + teacher.firstname + ' ' + teacher.validate);
                Notification.create({owner: teacher.owner, type: 'forum', post: postId}).exec(callback);
            });
        });
        callback();
    },

    removeForumNotification: function (userId, postId, callback) {
        /*Notification.destroy({owner: userId, type: 'forum', post: postId}).exec(callback);*/
    },

    seenForumNotification: function (userId, postId, callback) {
        Notification.update({owner: userId, type: 'forum', post: postId}, {seen: true}).exec(callback);
    }
}