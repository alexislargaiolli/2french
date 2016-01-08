/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /user/count': {blueprint: 'count'},
  'GET /diploma/count': {blueprint: 'count'},

  'get /': {
    view: 'index'
  },
  'get /views/:view1': 'PartialsController.partialsLevel1',
  'get /views/:view1/:view2': 'PartialsController.partialsLevel2',
  'get /views/:view1/:view2/:views3': 'PartialsController.partialsLevel3',

  /////////////////////////////////////////////
  ///////////    AuthController    ////////////
  /////////////////////////////////////////////
  'get /loggedin': 'AuthController.loggedin',
  'get /logout': 'AuthController.logout',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',
  'get /auth/:provider/:action': 'AuthController.callback',


  /////////////////////////////////////////////
  ///////////    UserController    ////////////
  /////////////////////////////////////////////
  'get /user/userEndTour': 'UserController.userEndTour',

  /////////////////////////////////////////////
  ///////////    DiplomaController    ////////////
  /////////////////////////////////////////////
  'get /diploma/downloadDiploma/:fd': 'DiplomaController.downloadDiploma',
  'get /diploma/validate/:diplomaId': 'DiplomaController.validate',



  /////////////////////////////////////////////
  ///////////   ProfileController   ///////////
  /////////////////////////////////////////////



  /////////////////////////////////////////////
  ///////////   ContactController   ///////////
  /////////////////////////////////////////////
  'post /contact': 'ContactController.contact',



  /////////////////////////////////////////////
  /////////////   PostController   ////////////
  /////////////////////////////////////////////
  'get /post/findone/:id': 'PostController.findOne',
  'get /post/postTeacherByCategory/:categoryId/:count/:pageSize/:pageIndex': 'PostController.postTeacherByCategory',
  'get /post/postGeneralByCategory/:categoryId/:count/:pageSize/:pageIndex': 'PostController.postGeneralByCategory',
  'get /post/downloadFile/:postId/:fd': 'PostController.downloadFile',


  /////////////////////////////////////////////
  ///////////   CommentController   ///////////
  /////////////////////////////////////////////
  'get /comment/postComments/:postId/:count/:pageSize/:pageIndex': 'CommentController.postComments',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
