var TooFrench = require('../utils/utils.js');
var HomePage = require('../pages/home.js');

/**
 * Created by alex on 17/10/15.
 */
describe('Edit teacher profile', function() {

    beforeAll(function(){
        var home = new HomePage();
        home.get();
        TooFrench.login(browser.params.teacher);
    });

    afterAll(function(){
        TooFrench.logout();
    });

    it('should access my profile page', function() {
        element(by.id('link-myprofile')).click();
        expect(element(by.id('profile-title')).getText()).toEqual(browser.params.teacher.pseudo);
    });

    it('should edit formation', function() {
        var selectFormation = element(by.id('select-formation'));
        selectFormation.element(by.css('.ui-select-search')).click();
        selectFormation.element(by.id('ui-select-choices-0')).click();
        expect(selectFormation.element(by.css('.ui-select-match > span'))).toBeDefined();
    });

    it('should edit motivation', function() {
        var motivation = "Motivations";
        element(by.id('editMotivationBtn')).click();
        element(by.id('motivationTextArea')).sendKeys(motivation);
        element(by.id('profile-title')).click();
        expect(element(by.css('[e-id="motivationTextArea"]')).getText()).toContain(motivation);
    });

    it('should edit hour rate', function() {
        var hourate = 10;
        element(by.id('editHourRateBtn')).click();
        element(by.id('editHourRateInput')).sendKeys(hourate);
        element(by.id('profile-title')).click();
        expect(element(by.id('editHourRateBtn')).getText()).toContain(hourate);
    });

    it('should upload a photo', function() {
        var pathToFile = browser.params.files.photo;
        var uploader = element(by.id('uploadAvatarBtn'));
        uploader.element(by.css('.btn-upload')).click();
        var inputFile = uploader.element(by.css('.SEL_uploaderInputFile'));

        browser.executeScript(
            "arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px'; arguments[0].style.opacity = 1",
            inputFile.getWebElement());
        inputFile.sendKeys(pathToFile);
        browser.driver.sleep(1000);
        uploader.element(by.id('upload-btn')).click();
    });

    it('should upload a diploma', function() {
        var pathToFile = browser.params.files.diploma;
        var inputFile = element(by.id('diplomaInput'));

        browser.executeScript("arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px'; arguments[0].style.opacity = 1",
            inputFile.getWebElement());
        inputFile.sendKeys(pathToFile);
        browser.driver.sleep(1000);
        element(by.id('uploadDiplomaBtn')).click();
        expect(element(by.id('uploadValidatinMsg'))).toBeDefined();
    });

});