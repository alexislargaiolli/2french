/**
 * Created by alex on 19/09/15.
 */
var should = require('should');
describe('ProfileModel', function () {

    describe('#find()', function () {
        it('should find one profile', function (done) {
            Profile.find().then(function (profiles) {
                profiles.should.not.be.empty;
                done();
            }).catch(done);
        });
    });

    describe('Call isProfileComplete() on a complete profile', function () {
        it('should return true', function (done) {
            var p = {photo: "url", hourRate: 10, motivation: "motivations", formations: [{name: "fleu"}]};
            Profile.isProfileComplete(p, function(complete){
                complete.should.be.true;
                done();
            });
        });
    });

    describe('Call isProfileComplete() on a not complete profile', function () {
        it('should return false', function (done) {
            var p = {hourRate: 10, motivation: "motivations", formations: [{name: "fleu"}]};
            Profile.isProfileComplete(p, function(complete){
                complete.should.be.false;
                done();
            });
        });
    });

    describe('Call isProfileValid() on a complete profile with a valid diploma', function () {
        it('should return true', function (done) {
            Profile.isProfileValid(1, function (valid) {
                valid.should.be.true;
                done();
            });
        });
    });

    describe('Call actionValidate() on a complete profile with a valid diploma', function () {
        it('should set profile.validate to true', function (done) {
            Profile.actionValidate(1, function(err, profile){
                should.not.exist(err);
                should.exist(profile);
                profile.validate.should.be.true;
                done();
            });
        });
    });

    describe('Call isTeacher() on a teacher profile', function () {
        it('should return true', function (done) {
            Profile.isTeacher(1, function(err, teacher){
                should.not.exist(err);
                teacher.should.be.true;
                done();
            });
        });
    });

    describe('Call isTeacher() on a student profile', function () {
        it('should return false', function (done) {
            Profile.isTeacher(3, function(err, teacher){
                should.not.exist(err);
                teacher.should.be.false;
                done();
            });
        });
    });

    describe('Call getTeacherReview() on a teacher profile with reviews', function () {
        it('should return an array of reviews', function (done) {
            Profile.getTeacherReview(1, function(err, reviews){
                should.not.exist(err);
                reviews.should.be.instanceof(Array).and.have.lengthOf(1);
                done();
            });
        });
    });

    describe('Call getFullProfile() on a complete teacher profile', function () {
        it('should return profile with all data populated', function (done) {
            Profile.getFullProfile(1, function(err, profile){
                should.not.exist(err);
                should.exist(profile);
                profile.isTeacher.should.be.ok;
                profile.isTeacher.should.be.true;
                done();
            });
        });
    });
});