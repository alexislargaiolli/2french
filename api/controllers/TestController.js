/**
 * TestController
 *
 * @description :: Server-side logic for testing purposes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    error : function(req, res){
        req.wantsJSON = false;
        return res.serverError('test');
    }

};

