/**
 * Created by alex on 19/09/15.
 */
var should = require('should'), assert = require('assert');
describe('User', function () {
    describe('#getTeachers()', function () {
        it('should return only teacher', function (done) {
            User.getTeachers(function (err, teachers) {
                assert(teachers.length > 0);
                teachers.forEach(function (teacher) {
                    assert(teacher.role === 'teacher' || teacher.role === 'admin');
                });
                done();
            });
        });
    });
});