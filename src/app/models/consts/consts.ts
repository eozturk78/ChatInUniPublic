export class Consts {
  // -- Api information
  public static protocol = 'http://';
  public static apiPath = 'localhost:3000/';
  public static resourcesFolder = 'resources/';
  public static serviceType = '';
  // -- User Service
  public static userService = 'User' + Consts.serviceType + '/';
  // -- Public service
  public static public = 'Public' + Consts.serviceType + '/';
  public static login = 'Login';
  public static forgotPassword = 'ForgotPassword';
  public static resetPassword = 'ResetPassword';
  public static signUp = 'SignUp';
  public static updateProfile = 'UpdateProfile';
  public static uploadProfilePhoto = 'UploadProfilePhoto';
  public static deleteProfilePhoto = 'DeleteProfilePhoto';
  public static getProfile = 'GetProfile';
  public static getStatusList = 'GetStatusList';
  public static getActiveUserList = 'GetActiveUserList';
  public static getUserProfileDetail = 'GetUserProfileDetail';
  public static getPublicToken = 'GetPublicToken';
  public static getMessageList = 'GetMessageList';
  public static deleteChat = 'DeleteChat';
  public static getPublicBlogList = 'GetPublicBlogList';
  public static getPublicBlogDetails = 'GetPublicBlogDetails';
  public static getLandingContent = 'getLandingContent';
}
