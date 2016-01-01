/**
 * Created by alex on 17/10/15.
 */
describe('Register a new teacher', function() {
    it('should access teacher register form', function() {
        element(by.id('headerRegisterBtn')).click();
        element(by.id('registerTeacherSwitch')).click();

        expect(element(by.id('registerTeacherSwitch')).isSelected()).toBeTruthy();
    });

    it('should fill teacher register form', function() {
        element(by.id('registerPseudo')).sendKeys(browser.params.teacher.pseudo);
        element(by.id('registerCity')).sendKeys(browser.params.teacher.city);
        element(by.id('registerEmail')).sendKeys(browser.params.teacher.email);
        element(by.id('registerEmailConfirmation')).sendKeys(browser.params.teacher.email);
        element(by.id('registerPassword')).sendKeys(browser.params.teacher.password);
        element(by.id('btnSubmitRegister')).click();

        browser.driver.sleep(2000);
        expect(element(by.id('user-menu'))).toBeDefined();
    });

    it('should close bootstrap tour', function() {
        element(by.css('.endTourBtn')).click();
    });
});