var HomePage = function() {

    this.get = function() {
        browser.get('http://localhost:1337/#/home');
    };

};
module.exports = HomePage;