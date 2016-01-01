/**
 * Created by alex on 17/10/15.
 */
describe('Access home page', function() {
    it('should access home page', function() {
        browser.get('http://localhost:1337');
        expect(browser.getTitle()).toEqual('TooFrench');
    });
});