/**
 * Created by alex on 19/09/15.
 */

var should = require('should');
describe('DiplomaModel', function() {

    describe('#find()', function () {
        it('should find one diploma', function (done) {
            Diploma.find().then(function(diplomas){
                diplomas.should.not.be.empty;
                done();
            }).catch(done);
        });
    });

    describe('#isValidated()', function () {
        it('should check validation of a diploma', function (done) {
            Diploma.isValidated(1, function(validated){
                validated.should.be.true;
                done();
            });
        });
    });

    describe('#isValidated() with null parameters', function () {
        it('should return false', function (done) {
            Diploma.isValidated(null, function(validated){
                validated.should.be.false;
                done();
            });
        });
    });

    describe('#validateDiploma()', function () {
        it('should return diploma with diplomaValidated attribute set to true', function (done) {
            Diploma.validateDiploma(2, function(err, diploma){
                should.not.exist(err);
                should.exist(diploma);
                diploma.diplomaValidated.should.be.true;
                done();
            });
        });
    });
});