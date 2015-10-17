/**
 * Created by alex on 17/10/15.
 */
describe('access to french home page', function() {
    it('should show toofrench home page', function() {
        browser.get('http://localhost:1337');

        expect(browser.getTitle()).toEqual('TooFrench');
    });
});