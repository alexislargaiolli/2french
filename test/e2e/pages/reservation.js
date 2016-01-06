var ReservationPage = function() {

    this.get = function(profileId, formulaId) {
        if(formulaId != null){
            browser.get('http://localhost:9999/#/reservation/' + profileId + '/' + formulaId);
        }
        else{
            browser.get('http://localhost:9999/#/reservation/' + profileId + '/');
        }
    };

};
module.exports = ReservationPage;