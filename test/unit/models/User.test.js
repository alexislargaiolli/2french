/**
 * Created by alex on 19/09/15.
 */
describe.only('UsersModel', function() {

    describe('#find()', function() {
        it('should check find function', function (done) {
            User.find()
                .then(function(results) {
                    // some tests
                    done();
                })
                .catch(done);
        });
    });

});