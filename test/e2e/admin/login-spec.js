/**
 * Created by alex on 17/10/15.
 */
describe('Log as admin user', function() {
    it('should log with admin user', function() {
        element(by.id('input-email')).sendKeys(browser.params.admin.email);
        element(by.id('input-pwd')).sendKeys(browser.params.admin.password);
        element(by.id('login-btn')).click();

        expect(element(by.id('user-menu'))).toBeDefined();

        browser.sleep(1000);
    });
});