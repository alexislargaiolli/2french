/**
 * Created by alex on 07/01/16.
 */
var tooFrenchServices = angular.module('tooFrenchApp');
tooFrenchServices.factory('ContactService', [ 'Messagerie', 'Session' ,function (Messagerie, Session) {
    return{
        /**
         * * Send a message to a given user
         * @param messageContent content of the message
         * @param recipient profile id of the recipient
         * @param cb callback method to call when message is sent
         */
        sendMessage : function(messageContent, recipient, cb){
            var from = Session.userId;
            var message = {};
            message.content = messageContent;
            message.author = from;
            message.recipient = recipient;
            Messagerie.sendMessage(from, recipient, message.content).then(function(){
                cb();
            }, function(){
                cb();
            });
        }
    }
}]);