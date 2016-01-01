exports.config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    //specs: ['home-spec.js', 'student-register-spec.js', 'student-logout-spec.js', 'admin-login-spec.js', 'admin-user-remove-spec.js'],
    suites: {
        home:['common/access-home-spec.js'],
        teacher: ['teacher/register-spec.js','teacher/profile-edit-spec.js', 'common/logout-spec.js'],
        validateDiploma: ['admin/login-spec.js', 'admin/diploma-validation-spec.js', 'common/logout-spec.js'],
        student : ['student/register-spec.js', 'student/search-spec.js', 'common/logout-spec.js'],
        admin: ['admin/login-spec.js', 'admin/user-remove-spec.js']
    },
    //specs: ['student/*-spec.js', 'admin/*-spec.js'],
    framework: 'jasmine',
    capabilities: {
        'browserName': 'firefox'
    },
    params: {
        files: {
            photo: '/home/alex/Téléchargements/profile-photo.jpg',
            diploma: '/home/alex/Téléchargements/diplome.pdf'
        },
        student: {
            pseudo: 'e2etests',
            email: 'student@e2e.fr',
            password: 'e2etests',
            city: 'Montpellier'
        },
        teacher: {
            pseudo: 'testTeacher',
            email: 'teacher@e2e.fr',
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
    }
};