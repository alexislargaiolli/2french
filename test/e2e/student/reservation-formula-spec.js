var TooFrench = require('../utils/utils.js');
var ReservationPage = require('../pages/reservation.js');
var LearnPage = require('../pages/learn.js');

/**
 * Created by alex on 17/10/15.
 */
describe('Create a new reservation with a selected formula', function() {

    beforeAll(function(){
        var learnPage = new LearnPage();
        learnPage.get();
        TooFrench.login(browser.params.student);
        var page = new ReservationPage();
        page.get(4, 0);
    });

    afterAll(function(){
        TooFrench.logout();
    });

    it('should be on new reservation formulaire with formula', function() {
        var resaContainer = element(by.id('resaContainer'));
        expect(resaContainer).toBeDefined();
        expect(element(by.id('formula-wrapper')).isDisplayed()).toBe(true);
    });

    it('should submit form', function() {
        element(by.id('submitResaBtn')).click();
        expect(element(by.css('.SEL_resaStatus.alert-success')).isDisplayed()).toBe(true);
    });

});