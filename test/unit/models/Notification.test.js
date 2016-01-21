/**
 * Created by alex on 19/09/15.
 */
var should = require('should');
describe('Notification', function () {
    var notif;
    before(function(done) {
        sails.log.error('Notification test before');
        Notification.findOne(1).exec(function(err, n){
            notif = n;
            sails.log.error(n);
            done();
        });
    });

    describe('#processConversation()', function () {
        it('should load interlocutor of notification', function (done) {
            done();
            /*Notification.findOne(1).exec(function(err, n){
                sails.log.error('Notification test find'+n);
                Notification.processConversation(n, function(err, n){
                    should.equal(n.interlocutor, "test2");
                    done();
                });
            });*/
        });
    });
});