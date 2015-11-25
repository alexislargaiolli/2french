/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  '*': [ 'passport' ],

  UserController : {
    '*' : [ 'passport', 'sessionAuth', 'admin'],
    findOne : ['passport', 'sessionAuth', 'adminOrOwner'],
    userEndTour : ['passport'],
    userChangeLocale : ['passport', 'sessionAuth' ],
    notificationSettings: ['passport', 'sessionAuth' ],
    updateNotificationSettings : ['passport', 'sessionAuth' ],
    changePassword : ['passport', 'sessionAuth'],
    forgot: [],
    checkResetToken: [],
    resetPassword: []
  },

  UserFavListController : {
    '*' : ['passport', 'sessionAuth', 'favListOwner'],
    find : ['passport', 'sessionAuth', 'admin'],
    findOne : ['passport', 'sessionAuth', 'favListOwner'],
    update : ['passport', 'sessionAuth', 'favListOwner'],
    create : ['passport', 'sessionAuth'],
    userList : ['passport', 'sessionAuth'],
    addToList: ['passport', 'sessionAuth'],
    removeFromList : ['passport', 'sessionAuth']
  },

  ProfileController : {
    create : [ 'passport', 'sessionAuth', 'admin'],
    update : ['passport', 'sessionAuth', 'profileOwner'],
    destroy : [ 'passport', 'sessionAuth', 'admin']
  },

  EquipmentController : {
    '*' : [ 'passport', 'sessionAuth', 'admin'],
    find : []
  },

  ServiceController : {
    '*' : [ 'passport', 'sessionAuth', 'admin'],
    find : []
  },

  ExtraController : {
    '*' : [ 'passport', 'sessionAuth', 'admin'],
    find : []
  },

  FormationController : {
    '*' : [ 'passport', 'sessionAuth', 'admin'],
    find : []
  },

  FormationLevelController : {
    '*' : [ 'passport', 'sessionAuth', 'admin'],
    find : []
  },

  LocaleController : {
    '*' : [ 'passport', 'sessionAuth', 'admin'],
    find : []
  },

  DiplomaController : {
    '*' : [ 'passport', 'sessionAuth', 'admin'],
    'userDiploma' : ['passport', 'sessionAuth', 'teacher'],
    'upload' : ['passport', 'sessionAuth', 'teacher']
  },
  ConversationController : {
    '*' : [ 'passport', 'sessionAuth', 'admin'],
    sendMessage : ['passport', 'sessionAuth', 'isSender'],
    allUserConversations : ['passport', 'sessionAuth'],
    userConversation: ['passport', 'sessionAuth'],
    totalUnseenMessageCount: ['passport', 'sessionAuth'],
    setAsRead: ['passport', 'sessionAuth']
  },
  ContactThemeController : {
    '*' : [ 'passport', 'sessionAuth', 'admin'],
    find : []
  },
  PostController:{
    '*':[ 'passport', 'sessionAuth'],
    find : [],
    findone : [],
    recentPosts : [],
    popularPosts : [],
    popularFilePosts:[],
    postGeneralByCategory : [],
    save : ['passport', 'sessionAuth', 'teacherPost'],
    destroy : [ 'passport', 'sessionAuth', 'admin']
  },
  PostCategoryController:{
    '*' : [ 'passport', 'sessionAuth', 'admin'],
    find : []
  },
  CommentController:{
    '*':[ 'passport', 'sessionAuth', 'admin'],
    'create' : ['passport', 'sessionAuth'],
    find : ['passport', 'sessionAuth'],
    postComments : ['passport', 'sessionAuth']
  },
  ReservationController:{
    '*':[ 'passport', 'sessionAuth'],
    'studentResa' : ['passport', 'sessionAuth', 'student'],
    'teacherResa' : ['passport', 'sessionAuth', 'teacher'],
    'create' : ['passport', 'sessionAuth', 'student'],
    'notifCount' : ['passport', 'sessionAuth'],
    'destroy' : ['passport', 'sessionAuth', 'admin'],
    'teacherChangeStatus' : ['passport', 'sessionAuth', 'teacher'],
    'cancelReservation': ['passport', 'sessionAuth']
  },
  ReviewsController:{
    '*':[ 'passport', 'sessionAuth', 'admin'],
    'teacherReviews':['passport', 'sessionAuth']
  },
  NotificationController : {
    '*':[ 'passport', 'sessionAuth', 'admin'],
    'unseen': ['passport', 'sessionAuth']
  }

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
};
