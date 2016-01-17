/**
 * Created by alex on 15/11/15.
 */
function createResaNotification(userId, resaId, callback) {
    Notification.create({owner: userId, type: 'resa', reservation: resaId}).exec(callback);
}

function removeResaNotification(userId, resaId, callback) {
    /*Notification.destroy({owner : userId, type : 'resa', reservation : resaId}).exec(function(err){
     if(err){
     return callback(err);
     }
     return callback(null);
     });*/
}

function createNewMessageNotification(userId, conversationId, callback) {
    Notification.create({owner: userId, type: 'message', conversation: conversationId}).exec(function (err, notif) {
        if (err) {
            return callback(err);
        }
        return callback(null, notif);
    });
}

function removeMessageNotification(userId, conversationId, callback) {
    /*Notification.destroy({owner : userId, type : 'message', conversation : conversationId}).exec(function(err){
     if(err){
     return callback(err);
     }
     return callback(null);
     });*/
}

function createForumNotification(userId, postId, callback) {
    Notification.create({owner: userId, type: 'forum', post: postId}).exec(function (err, notif) {
        if (err) {
            return callback(err);
        }
        return callback(null, notif);
    });
}

function removeForumNotification(userId, postId, callback) {
    Notification.destroy({owner: userId, type: 'forum', post: postId}).exec(function (err) {
        if (err) {
            return callback(err);
        }
        return callback(null);
    });
}

module.exports = {
    createResaNotification: createResaNotification,
    removeResaNotification: removeResaNotification,
    createNewMessageNotification: createNewMessageNotification,
    removeMessageNotification: removeMessageNotification,
    createForumNotification : createForumNotification,
    removeForumNotification: removeForumNotification
}