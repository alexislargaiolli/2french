/**
 * RecommandationController
 *
 * @description :: Server-side logic for managing Recommandations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    findByCity : function(req, res){
        Recommandation.find(
            {"city.address_components" :
            {
                $elemMatch: {
                    long_name: req.query['city']
                }
            }
            }
        )
            .exec(function(err, recommendations){
                if(err){
                    res.send('500', 'error')
                }
                res.send(200, recommendations);
            });
    }
};

