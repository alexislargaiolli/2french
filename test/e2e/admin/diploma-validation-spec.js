/**
 * Created by alex on 17/10/15.
 */
describe('Log as admin user', function() {

    it('should access admin panel', function() {
        element(by.id('menuAdminBtn')).click();
        expect(element(by.id('adminMenuBar'))).toBeDefined();
    });

    it('should access admin diploma panel', function() {
        element(by.css('[ui-sref="admin.diplomas"]')).click();
        expect(element(by.id('userDatatable'))).toBeDefined();
    });

    it('should validate test teacher diploma', function() {
        var datatable = element(by.css('.alex-datatable'));
        datatable.element(by.xpath('//tr/td/span[contains(text(),\'' + browser.params.teacher.email + '\')]')).click();
        element(by.id('validateDiplomaBtn')).click();
        element(by.css('[ng-click="dialog.hide()"]')).click();
        browser.driver.sleep(1000);
    });
});