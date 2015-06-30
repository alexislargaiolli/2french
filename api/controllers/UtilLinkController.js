/**
 * UtilLinkController
 *
 * @description :: Server-side logic for managing Utillinks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    findByCity : function(req, res){
        UtilLink.find(
            {"city.address_components" :
            {
                $elemMatch: {
                    long_name: req.query['city']
                }
            }
            }
        )
            .exec(function(err, links){
                if(err){
                    res.send('500', 'error')
                }
                res.send(200, links);
            });
    }
};

