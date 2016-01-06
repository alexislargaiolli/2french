var HomePage = function() {

    this.get = function() {
        browser.get('http://localhost:9999/#/home');
    };

};
module.exports = HomePage;