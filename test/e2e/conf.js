exports.config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    //specs: ['home-spec.js', 'student-register-spec.js', 'student-logout-spec.js', 'admin-login-spec.js', 'admin-user-remove-spec.js'],
    suites: {
        global : 'admin/*-spec.js'
    },
    //specs: ['home-spec.js'],
    capabilities: {
        'browserName': 'firefox'
    },
    params: {
        student: {
            pseudo: 'e2etests',
            email: 'student@e2e.fr',
            password: 'e2etests',
            city: 'Montpellier'
        },
        admin: {
            pseudo: 'adminTest',
            email: 'admin@e2e.fr',
            password: 'e2etests'
        }
    }
};