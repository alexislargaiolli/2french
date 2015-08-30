/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	test : function(req, res){
        sails.sockets.emit('55168a7610474bfa20f62c92', 'private', {text : 'test'});
        sails.sockets.blast('test', {text : 'test'});
        res.send(200, 'ok');
    }
};

