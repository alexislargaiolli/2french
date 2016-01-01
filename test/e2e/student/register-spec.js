var RegisterPage = require('../pages/register.js');
var TooFrench = require('../utils/utils.js');

/**
 * Created by alex on 17/10/15.
 */
describe('Register a new student', function() {

    var page;

    beforeAll(function(){
        page = new RegisterPage();
        page.get();
    });

    afterAll(function(){
        TooFrench.logout();
    });

    it('should access student register form', function() {
        page.student();

        expect(element(by.id('registerStudentSwitch')).isSelected()).toBeTruthy();
    });

    it('should fill student register form', function() {
        page.register(browser.params.studentToCreate);
        expect(element(by.id('user-menu'))).toBeDefined();
    });

    it('should close bootstrap tour', function() {
        element(by.css('.endTourBtn')).click();
    });
});