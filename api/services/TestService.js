module.exports = {
    logStudent: function (agent, done) {
        agent.post('/auth/local')
            .send({
                identifier: sails.config.test.testStudentEmail,
                password: sails.config.test.testStudentPassword
            }).end(function (err, res) {
                if (err) return done(err);
                done();
            });
    },

    logTeacher: function (agent, done) {
        agent.post('/auth/local')
            .send({
                identifier: sails.config.test.testTeacherEmail,
                password: sails.config.test.testTeacherPassword
            }).end(function (err, res) {
                if (err) return done(err);
                sails.log.info('Logged as ' + sails.config.test.testTeacherEmail);
                done();
            });
    },
    getProfiles: function (cb) {
        Profile.find({id: sails.config.testTeacherProfileId}).exec(function (err, teacher) {
            if(err){
                return cb(err);
            }
            Profile.find({id: sails.config.testStudentProfileId}).exec(function (err, student) {
                cb(err, teacher, student);
            });
        });
    }

}