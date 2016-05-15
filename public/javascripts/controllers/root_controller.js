angular.module('movieStar').controller('RootController', ['$scope', '$rootScope', 'sessionUserService', function (scope, rootScope, sessionUserService) {
  rootScope.loggedIn = false;

  rootScope.initialize = function () {
    sessionUserService.getSessionUser().then(function (result) {
      rootScope.sessionUserName = result.username;
      rootScope.sessionUser = result;
    });
  };
}]);
