var assert = require('assert'),
    should = require('should'),
    request = require('supertest'),
    Reservation = require('../../../api/controllers/ReservationController');

/**
 * Created by alex on 26/10/15.
 */
describe('ReservationController', function () {
    describe('logged out', function () {
        describe('#teacherResa()', function () {
            it('shoud return unauthorized', function (done) {
                request(sails.hooks.http.app)
                    .get('/reservation/teacherResa')
                    .expect(401, done);
            });
        });
    });
    describe('logged as teacher', function () {
        var agent;

        before(function (done) {
            agent = request.agent(sails.hooks.http.app);
            TestService.logTeacher(agent, done);
        });

        describe('#teacherResa()', function () {
            it('shoud return a list', function (done) {
                agent.get('/reservation/teacherResa')
                    .expect(200, done);
            });
        });

        describe('#studentResa()', function () {
            it('shoud return forbidden', function (done) {
                agent.get('/reservation/studentResa')
                    .expect(403, done);
            });
        });

        describe('#create()', function () {
            it('shoud return a list', function (done) {
                var resa = {
                    date: new Date(),
                    student: sails.config.test.testStudentProfileId,
                    teacher: sails.config.test.testTeacherProfileId
                };
                agent.post('/reservation/create')
                    .send(resa)
                    .expect(403)
                    .end(done);
            });
        });
    });

    describe('logged as student', function () {
        var agent;
        before(function (done) {
            agent = request.agent(sails.hooks.http.app);
            TestService.logStudent(agent, done);
        });

        describe('#teacherResa()', function () {
            it('shoud return forbidden', function (done) {
                agent.get('/reservation/teacherResa')
                    .expect(403, done);
            });
        });

        describe('#studentResa()', function () {
            it('shoud return a list', function (done) {
                agent.get('/reservation/studentResa')
                    .expect(200, done);
            });
        });

        var createdResaId;
        describe('#create()', function () {
            it('shoud create a reservation', function (done) {
                var d = new Date();
                d.setMonth(d.getMonth() + 1);
                var resa = {
                    date: d,
                    student: sails.config.test.testStudentProfileId,
                    teacher: sails.config.test.testTeacherProfileId
                };
                agent.post('/reservation/create')
                    .send(resa)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        createdResaId = res.body.id;
                        should.exist(createdResaId);
                        agent.get('/reservation/studentResa')
                            .expect(200, function (err, res) {
                                if (err) {
                                    return done(err);
                                }
                                res.body.should.have.length(1);
                                done();
                            });
                    });
            });
        });

        describe('#addReview() on a futur resa', function () {
            it('shoud return forbidden', function (done) {
                var review = {
                    resaId : createdResaId,
                    mark : 4,
                    comment : 'Pas mal'
                };
                agent.post('/reservation/addReview')
                    .send(review)
                    .expect(403)
                    .end(done);
            });
        });

        describe('#addReview() on a passed resa', function () {
            before(function(done){
                var d = new Date();
                d.setMonth(d.getMonth() - 1);
                var resa = {
                    date: d,
                    student: sails.config.test.testStudentProfileId,
                    teacher: sails.config.test.testTeacherProfileId
                };
                agent.post('/reservation/create')
                    .send(resa)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        createdResaId = res.body.id;
                        should.exist(createdResaId);
                        done();
                    });
            });
            it('shoud create a review', function (done) {
                var review = {
                    resaId : createdResaId,
                    mark : 4,
                    comment : 'Pas mal'
                };
                agent.post('/reservation/addReview')
                    .send(review)
                    .expect(200)
                    .end(function(err, resa){
                        if(err){
                            return done(err);
                        }
                        done();
                    });
            });
        });

        describe('#getResaCount', function () { 

            it('should return the number of reservation between two dates', function(done){
                Reservation.find({},function(err, reservations){
                    reservations.should.have.length(0);
                });
            });

        });
    });
});