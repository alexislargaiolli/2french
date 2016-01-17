/**
 * Created by alex on 19/09/15.
 */
var should = require('should');
describe('Conversation', function () {
    var notif;
    before(function(done) {
        Notification.findOne(1).exec(function(err, n){
            notif = n;
            done();
        });
    });

    describe('#getConversationInterlocutorPseudo()', function () {
        it('should return "test2"', function (done) {
            Conversation.getConversationInterlocutorPseudo(1, function(err, firstname){
                should.equal(firstname, "test2");
                done();
            });
        });
    });

    describe('#getConversationInterlocutorPseudo() with unknown conversation in french', function () {
        it('should return null', function (done) {
            Conversation.getConversationInterlocutorPseudo(12, function(err, firstname){
                should.not.exist(firstname);
                done();
            });
        });
    });
});