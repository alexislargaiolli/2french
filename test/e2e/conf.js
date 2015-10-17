exports.config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    specs: ['home-spec.js', 'login-spec.js'],
    capabilities: {
        'browserName': 'firefox'
    }
};