/**
 * Created by alex on 17/10/15.
 */
describe('Remove a user from admin panel', function() {


    it('should access admin panel', function() {
        element(by.id('menuAdminBtn')).click();
        expect(element(by.id('adminMenuBar'))).toBeDefined();
    });

    it('should access admin user panel', function() {
        element(by.css('[ui-sref="admin.users"]')).click();
        expect(element(by.id('userDatatable'))).toBeDefined();
    });

    it('should search and find test student user', function() {
        element(by.css('.SEL_input_email')).sendKeys(browser.params.student.email);
        expect(element(by.css('.SEL_email')).getText()).toEqual(browser.params.student.email);
    });

    it('should remove test student user', function() {
        element(by.css('.SEL_email')).click();
        element(by.id('btnRemoveUser')).click();
        element(by.css('[ng-click="dialog.hide()"]')).click();
        browser.driver.sleep(2000);
    });
});