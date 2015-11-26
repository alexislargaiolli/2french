/**
 * PartialsController
 *
 * @description :: Server-side logic for serving .ejs dynamicaly
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	partialsLevel1 : function(req, res){
        res.view('partials/' + req.params['view1'].replace('.html', ''));
    },
    partialsLevel2 : function(req, res){
        res.view('partials/' + req.params['view1'] + '/'+ req.params['view2'].replace('.html', ''));
    },
    partialsLevel3 : function(req, res){
        res.view('partials/' + req.params['view1'] + '/'+ req.params['view2'] + '/'+ req.params['view3'].replace('.html', ''));
    }
};

