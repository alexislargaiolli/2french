var RegisterPage = require('../pages/register.js');
var TooFrench = require('../utils/utils.js');
/**
 * Created by alex on 17/10/15.
 */
describe('Register a new teacher', function() {

    var page;

    beforeAll(function(){
        page = new RegisterPage();
        page.get();
    });

    afterAll(function(){
        TooFrench.logout();
    });

    it('should access teacher register form', function() {
        page.teacher();
        expect(element(by.id('registerTeacherSwitch')).isSelected()).toBeTruthy();
    });

    it('should fill teacher register form', function() {
        page.register(browser.params.teacherToCreate);
        expect(element(by.id('user-menu'))).toBeDefined();
    });

    it('should close bootstrap tour', function() {
        element(by.css('.endTourBtn')).click();
    });
});