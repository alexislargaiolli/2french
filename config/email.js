/**
 * Created by alex on 29/09/15.
 */

module.exports.email = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD
    },
    from: 'notification@toofrench.net',
    templateDir: 'views/emailTemplates'
    //testMode : true,
};