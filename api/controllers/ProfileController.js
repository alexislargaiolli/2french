/**
 * ProfileController
 *
 * @description :: Server-side logic for managing Profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    findByCity: function (req, res) {
        Profile.find(
            {
                "city.address_components": {
                    $elemMatch: {
                        long_name: req.query['city']
                    }
                }
            }
        )
            .populate('formations')
            .populate('extras')
            .exec(function (err, profiles) {
                if (err) {
                    res.send('500', 'error')
                }
                res.send(200, profiles);
            });
    }
};

