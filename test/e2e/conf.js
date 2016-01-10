var Sails = require('sails'),
    sails,
    Barrels = require('barrels');

exports.config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    //specs: ['home-spec.js', 'student-register-spec.js', 'student-logout-spec.js', 'admin-login-spec.js', 'admin-user-remove-spec.js'],
    suites: {
        //home:['common/access-home-spec.js'],
        //teacher: ['teacher/register-spec.js','teacher/profile-edit-spec.js'],
        //validateDiploma: ['admin/login-spec.js', 'admin/diploma-validation-spec.js'],
        student : ['student/register-spec.js'/*, 'student/search-spec.js'*/],
        reservation : ['student/reservation-spec.js','student/reservation-formula-spec.js'],
        //admin: ['admin/login-spec.js', 'admin/user-remove-spec.js']
    },
    //specs: ['student/*-spec.js', 'admin/*-spec.js'],
    framework: 'jasmine',
    capabilities: {
        'browserName': 'firefox'
    },
    baseUrl: 'http://localhost:9999/',
    params: {
        files: {
            photo: './test/e2e/assets/profile-photo.jpg',
            diploma: './test/e2e/assets/diplome.pdf'
        },
        studentToCreate: {
            pseudo: 'NouvelEtudiant',
            email: 'student@test.fr',
            password: 'e2etests',
            city: 'Montpellier'
        },
        student: {
            pseudo: 'e2etests',
            email: 'student@e2e.fr',
            password: 'e2etests',
            city: 'Montpellier'
        },
        teacherToCreate: {
            pseudo: 'teacher',
            email: 'teacher@test.fr',
            password: 'e2etests',
            city: 'Montpellier'
        },
        teacher: {
            pseudo: 'testTeacher',
            email: 'teacher@e2e.fr',
            password: 'e2etests',
            city: 'Montpellier'
        },
        dunbledor: {
            firstname:'Albus Dumbledor',
            pseudo: 'dumbledor',
            email: 'dumbedor@poudlard.uk',
            password: 'e2etests',
            city: 'Montpellier'
        },
        admin: {
            pseudo: 'adminTest',
            email: 'admin@e2e.fr',
            password: 'e2etests'
        }
    },
    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true
    },
    beforeLaunch: function() {
        var q = require('q');
        var deferred = q.defer();
        Sails.lift({
            port:9999,
            log: {
                level: 'debug'
            },
            models: {
                connection: 'test',
                migrate: 'drop'
            },
            email:{
                testMode : true
            }
        }, function(err, server) {
            sails = server;
            if (err){
                return deferred.reject(err);
            }
            // Load fixtures
            var barrels = new Barrels();

            // Populate the DB
            barrels.populate(['user'],function(err) {
                if(err){
                    sails.log.error(err);
                    return deferred.reject();
                }
                barrels.populate(['passport', 'formation', 'profile', 'diploma'],function(err) {
                    if(err){
                        sails.log.error(err);
                        return deferred.reject();
                    }
                    Profile.find().exec(function(err, profiles){
                        sails.log.debug(profiles[3].id);
                    });
                    deferred.resolve();
                }, false);
            },false);
        });

        return deferred.promise;
    },
    onCleanUp: function(exitCode) {
        Sails.lower();
    }
};