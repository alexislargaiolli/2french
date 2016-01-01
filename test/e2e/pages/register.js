var RegisterPage = function() {

    this.get = function() {
        browser.get('http://localhost:1337/#/register');
    };

    this.student = function(){
        element(by.id('registerStudentSwitch')).click();
    }

    this.teacher = function(){
        element(by.id('registerTeacherSwitch')).click();
    }

    this.register = function(user){
        element(by.id('registerPseudo')).sendKeys(user.pseudo);
        element(by.id('registerCity')).sendKeys(user.city);
        element(by.id('registerEmail')).sendKeys(user.email);
        element(by.id('registerEmailConfirmation')).sendKeys(user.email);
        element(by.id('registerPassword')).sendKeys(user.password);
        element(by.id('btnSubmitRegister')).click();

        browser.driver.sleep(1000);
    }

};

module.exports = RegisterPage;