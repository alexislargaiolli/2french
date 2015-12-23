/**
 * Created by alex on 17/10/15.
 */
describe('Remove a user from admin panel', function() {


    it('should access admin panel', function() {
        element(by.id('menuAdminBtn')).click();
        expect(element(by.id('adminMenuBar'))).toBeDefined();
    });

    it('should access admin user panel', function() {
        element(by.id('adminMenuBarUserBtn')).click();
        expect(element(by.id('userDatatable'))).toBeDefined();
    });

    it('should remove test student user', function() {
        element(by.id('SEL_input_email')).sendKeys(browser.params.student.email);
        expect(element(by.id('column_email')).element('span')).toEqual(browser.params.student.email);
    });
});