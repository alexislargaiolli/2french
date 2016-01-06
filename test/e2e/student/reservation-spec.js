var TooFrench = require('../utils/utils.js');
var ReservationPage = require('../pages/reservation.js');
var LearnPage = require('../pages/learn.js');

/**
 * Created by alex on 17/10/15.
 */
describe('Create a new reservation', function() {

    beforeAll(function(){
        var learnPage = new LearnPage();
        learnPage.get();
        TooFrench.login(browser.params.student);
        var page = new ReservationPage();
        page.get(4);
    });

    afterAll(function(){
        TooFrench.logout();
    });

    it('should be on new reservation formulaire', function() {
        var resaContainer = element(by.id('resaContainer'));
        expect(resaContainer).toBeDefined();
    });

    it('should select a formation', function() {
        var selectFormation = element(by.id('select-formation'));
        selectFormation.click();
        selectFormation.element(by.id('select-formation-choices')).element(by.id('ui-select-choices-0')).click();
        var isFormationPlaceholderVisible = selectFormation.element(by.css('.ui-select-placeholder')).isDisplayed();
        expect(isFormationPlaceholderVisible).toBe(false);
    });

    it('should select a duration', function() {
        var selectDuration= element(by.id('select-duration'));
        selectDuration.click();
        selectDuration.element(by.id('select-duration-choices')).element(by.id('ui-select-choices-1')).click();
        var isDurationPlaceholderVisible = selectDuration.element(by.css('.ui-select-placeholder')).isDisplayed();
        expect(isDurationPlaceholderVisible).toBe(false);
    });

    it('should submit form', function() {
        element(by.id('submitResaBtn')).click();
        expect(element(by.css('.SEL_resaStatus.alert-success')).isDisplayed()).toBe(true);
    });

});