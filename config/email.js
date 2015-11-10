/**
 * Created by alex on 29/09/15.
 */

module.exports.email = {
    service : 'Postmark',
    auth : {
        user : '3cf353ad-1e6b-4fb9-b6bb-cd9168af4f30',
        pass : '3cf353ad-1e6b-4fb9-b6bb-cd9168af4f30'
    },
    from : 'notification@toofrench.net',
    templateDir : 'views/emailTemplates',
    //testMode : true,
    alwaysSendTo : 'alexis.largaiolli@gmail.com'
};