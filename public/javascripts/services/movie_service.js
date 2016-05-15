angular.module('movieStar').service('movieService', ["$resource", "$q", function (resource, q) {
  var service = {};

  var Favorites = resource("/favorites");
  var Favorited = resource("/isMovieFavorited");

  service.isMovieFavorited = function (movieId) {
    var request = q.defer();

    Favorited.get({imdbID: movieId},
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
