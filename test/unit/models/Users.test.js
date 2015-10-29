/**
 * Created by alex on 19/09/15.
 */

describe('#find()', function() {
    it('should check find function', function (done) {
        User.find()
            .then(function(results) {
                sails.log.info('test user');
                done();
            })
            .catch(done);
    });
});