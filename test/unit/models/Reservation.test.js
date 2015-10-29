var assert = require('assert'),
    should = require('should');

/**
 * Created by alex on 26/10/15.
 */
describe('Reservation', function () {
    describe('#create()', function () {
        it('should create a reservation', function (done) {
            Reservation.create({
                student: sails.config.test.testTeacherProfileId,
                teacher: sails.config.test.testTeacherProfileId,
                date : new Date()
            })
            .exec(function (err, resa) {
                should.exist(resa);
                done();
            })
        });
    });

    describe('#destroy()', function () {
        it('should remove all reservation of user test@e2e.fr', function (done) {
            var query = {
                $or: [
                    {'student': sails.config.test.testTeacherProfileId},
                    {'teacher': sails.config.test.testTeacherProfileId}
                ]
            };
            Reservation.destroy(query).then(function (results) {
                Reservation.find(query).then(function (result) {
                    assert.equal(0, result.length);
                    done();
                });
            }).catch(done);
        });
    });
});