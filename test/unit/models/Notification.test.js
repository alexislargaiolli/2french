/**
 * Created by alex on 19/09/15.
 */
var should = require('should');
describe('Notification', function () {
    var notif;
    beforeEach(function(done) {
        Notification.findOne(1).exec(function(err, n){
            notif = n;
            done();
        });
    });

    describe('#processConversation()', function () {
        it('should load interlocutor of notification', function (done) {
            Notification.processConversation(notif, function(err){
                should.equal(notif.interlocutor, "test2");
                done();
            });
        });
    });
});