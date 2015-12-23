/**
 * Created by alex on 17/10/15.
 */
describe('access to french home page', function() {
    it('should show toofrench home page', function() {
        element(by.id('input-email')).sendKeys(browser.params.student.email);
        element(by.id('input-pwd')).sendKeys(browser.params.student.password);
        element(by.id('login-btn')).click();

        expect(element(by.id('user-menu'))).toBeDefined();
    });
});