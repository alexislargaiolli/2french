var TooFrench = require('../utils/utils.js');
var HomePage = require('../pages/home.js');

/**
 * Created by alex on 17/10/15.
 */
describe('Search a teacher in search engine', function() {

    beforeAll(function(){
        var home = new HomePage();
        home.get();
        TooFrench.login(browser.params.student);
    });

    afterAll(function(){
        TooFrench.logout();
    });

    it('should type teacher city in search bar and run search', function() {
        element(by.id('search-text')).sendKeys(browser.params.teacher.city);
        element(by.id('search-btn')).click();
    });

    it('should find teacher in results and select it', function() {
        var resultItem = element(by.xpath('//span[contains(@class,\'SEL_resultFisrtName\') and contains(text(), \''+browser.params.teacher.pseudo+'\')]'));
        expect(resultItem).toBeDefined();
        resultItem.click();
        var profileTitle = element(by.id('userName'));
        expect(profileTitle).toBeDefined();
        expect(profileTitle.getText()).toEqual(browser.params.teacher.pseudo);
    });
});