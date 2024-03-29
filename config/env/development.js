/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    /***************************************************************************
     * Set the default database connection for models in the development       *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    models: {
        connection: 'mongo'
    },
    log: {
        level: "info"
    },
    email: {
        testMode: false,
        alwaysSendTo: 'alexis.largaiolli@gmail.com'
    },

    autoreload: {
        active: true,
        usePolling: true,
        dirs: [
            "api/models",
            "api/controllers",
            "api/services",
            "config/locales",
            "assets/js",
            "assets/partials",
            "assets/style",
            "assets/index.html"
        ],
        ignored: [
            // Ignore all files with .ts extension
            "**.ts"
        ]
    }
};
