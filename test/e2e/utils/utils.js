module.exports = {
    login: function (user) {
        element(by.id('input-email')).sendKeys(user.email);
        element(by.id('input-pwd')).sendKeys(user.password);
        element(by.id('login-btn')).click();
    },

    logout: function () {
        element(by.id('user-menu-dropdown')).click();
        element(by.id('logoutBtn')).click();
        browser.driver.sleep(1000);
    }
}