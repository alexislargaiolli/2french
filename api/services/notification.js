/**
 * Created by alex on 15/11/15.
 */
function createResaNotification(userId, resaId, callback) {
    Notification.create({owner: userId, type: 'resa', reservation: resaId}).exec(callback);
}

function removeResaNotification(userId, resaId, callback) {
    /*Notification.destroy({owner: userId, type: 'resa', reservation: resaId}).exec(callback);*/
}

function seenResaNotification(userId, resaId, callback) {
    Notification.update({owner: userId, type: 'resa', reservation: resaId}, {seen: true}).exec(callback);
}

function createNewMessageNotification(userId, conversationId, callback) {
    Notification.create({owner: userId, type: 'message', conversation: conversationId}).exec(callback);
}

function seenMessageNotification(userId, conversationId, callback) {
    Notification.update({
        owner: userId,
        type: 'message',
        conversation: conversationId
    }, {seen: true}).exec(callback);
}

function removeMessageNotification(userId, conversationId, callback) {
    /*Notification.destroy({owner: userId, type: 'message', conversation: conversationId}).exec(callback);*/
}

function createForumNotification(userId, postId, callback) {
    Notification.create({owner: userId, type: 'forum', post: postId}).exec(callback);
}

function removeForumNotification(userId, postId, callback) {
    /*Notification.destroy({owner: userId, type: 'forum', post: postId}).exec(callback);*/
}

function seenForumNotification(userId, postId, callback) {
    Notification.update({owner: userId, type: 'forum', post: postId}, {seen: true}).exec(callback);
}

module.exports = {
    createResaNotification: createResaNotification,
    removeResaNotification: removeResaNotification,
    seenResaNotification: seenResaNotification,
    createNewMessageNotification: createNewMessageNotification,
    removeMessageNotification: removeMessageNotification,
    seenMessageNotification: seenMessageNotification,
    createForumNotification: createForumNotification,
    removeForumNotification: removeForumNotification,
    seenForumNotification: seenForumNotification
}