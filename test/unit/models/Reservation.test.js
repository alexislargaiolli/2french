var assert = require('assert'),
    should = require('should'),
    expect = require('chai').expect;

/**
 * Created by alex on 26/10/15.
 */
describe('Reservation', function() {
    describe('#create()', function() {
        it('should create a reservation', function(done) {
            sails.log.info('test');
            /*Reservation.create({
                student: sails.config.test.testTeacherProfileId,
                teacher: sails.config.test.testTeacherProfileId,
                date : new Date()
            })
            .exec(function (err, resa) {
                should.exist(resa);
                done();
            })*/
            done();
        });
    });

    describe('#destroy()', function() {
        it('should remove all reservation of user test@e2e.fr', function(done) {
            /*var query = {
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
            }).catch(done);*/
            done();
        });
    });

    describe('#findBetween()', function() {

        it('should exist a least one resa', function(done) {
            Reservation.find(function(err, reservations) {
                expect(reservations).to.have.length.above(0);
                sails.log.warn(reservations[0]);
                done();
            });
        });

        it('should return a list of reservation', function(done) {
            var from = new Date('10/01/2015');
            var to = new Date('09/01/2015');
            Reservation.findBetween(from, to, function(err, reservations) {
                expect(reservations).to.be.an.instanceof(Array);
                done();
            });
        });

        it('should return empty array with second date parameter anterior to first parameter ', function(done) {
            var from = new Date('10/01/2015');
            var to = new Date('09/01/2015');
            Reservation.findBetween(from, to, function(err, reservations) {
                expect(reservations).to.be.empty;
                done();
            });
        });

        it('should return one resa between to date', function(done) {
            Reservation.findBetween(new Date(2015, 01, 01), new Date(2017, 01, 01), function(err, reservations) {
                expect(reservations).to.have.length(1);
                done();
            });
        });

        it('should return no resa between to date', function(done) {
            Reservation.findBetween(new Date('01/01/2014'), new Date('01/01/2015'), function(err, reservations) {
                expect(reservations).to.have.length(0);
                done();
            });
        });

        it('should return err with wrong parameters', function(done) {
           Reservation.findBetween("resr", 2, function(err, reservations) {
                expect(err).to.exist;
                done();
            }); 
        });

    });
});
