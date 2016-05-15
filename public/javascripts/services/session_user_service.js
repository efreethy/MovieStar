angular.module('movieStar').service('sessionUserService', ["$resource", "$q", function (resource, q) {
  var service = {};

  var SesionUser = resource("/sessionUser");

  // makes a call to the server to grab information on the currently logged in user
  service.getSessionUser = function (movieId) {
    var request = q.defer();

    SesionUser.get({ },
      function (success) {
        request.resolve(success);
      },
      function (failure) {
        request.reject(failure);
      });

    return request.promise;
  };

  return service;

}]);
