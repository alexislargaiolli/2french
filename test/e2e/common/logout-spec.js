/**
 * Created by alex on 17/10/15.
 */
describe('Log out', function() {
    it('should log out', function() {
        element(by.id('user-menu-dropdown')).click();
        element(by.id('logoutBtn')).click();
        browser.driver.sleep(1000);
    });
});