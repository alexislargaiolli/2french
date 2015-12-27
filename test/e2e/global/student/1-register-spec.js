/**
 * Created by alex on 17/10/15.
 */
describe('Register a new student', function() {
    it('should access student register form', function() {
        browser.get('http://localhost:1337');
        element(by.id('register-btn')).click();
        expect(element(by.id('registerStudentSwitch')).isSelected()).toBeTruthy();
    });

    it('should fill student register form', function() {
        element(by.id('registerPseudo')).sendKeys(browser.params.student.pseudo);
        element(by.id('registerCity')).sendKeys(browser.params.student.city);
        element(by.id('registerEmail')).sendKeys(browser.params.student.email);
        element(by.id('registerEmailConfirmation')).sendKeys(browser.params.student.email);
        element(by.id('registerPassword')).sendKeys(browser.params.student.password);
        element(by.id('btnSubmitRegister')).click();

        browser.driver.sleep(2000);
        expect(element(by.id('user-menu'))).toBeDefined();
    });

    it('should close bootstrap tour', function() {
        element(by.css('.endTourBtn')).click();
    });
});