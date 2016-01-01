/**
 * Created by alex on 19/09/15.
 */

describe('User', function () {
    describe('#find()', function () {
        it('should check find function', function (done) {
            User.find()
                .then(function (results) {
                    sails.log.info(results);
                    results.should.not.be.empty;
                    done();
                })
                .catch(done);
        });
    });
});