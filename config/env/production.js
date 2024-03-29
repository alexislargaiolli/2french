/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    /***************************************************************************
     * Set the default database connection for models in the production        *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    models: {
        connection: 'mongoProd' //Careful, used in DiplomaController directly
    },

    /***************************************************************************
     * Set the port in the production environment to 80                        *
     ***************************************************************************/

    //port: 80

    /***************************************************************************
     * Set the log level in production environment to "silent"                 *
     ***************************************************************************/

    log: {
        level: "info"
    },

    email: {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PWD
        },
        from: 'notification@toofrench.net',
        templateDir: 'views/emailTemplates'
    },

    grunt: {
        hookTimeout: 50000
    }
};