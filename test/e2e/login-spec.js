/**
 * Created by alex on 17/10/15.
 */
describe('access to french home page', function() {
    it('should show toofrench home page', function() {
        browser.get('http://localhost:1337');

        element(by.id('input-email')).sendKeys('test@e2e.fr');
        element(by.id('input-pwd')).sendKeys('e2etests');
        element(by.id('login-btn')).click();

        expect(element(by.id('user-menu'))).toBeDefined();
    });
});