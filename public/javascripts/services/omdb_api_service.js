angular.module('movieStar').service('omdbApiService', ["$resource", "$q", function (resource, q) {
  // This angular service makes omdb api requests, and return results.
  // Services are great for abstracting away the process of fetching data, and provide a
  // simple interface to access the data you need. In Angular applications, services
  // are typically used from within angular controllers.

  var service = {};

  var Movies = resource("http://www.omdbapi.com/");


  service.getMovie = function (movieId) {
    var request = q.defer();
    // creates a get request of the form "http://www.omdbapi.com?i=<imdbID>
    Movies.get({i: movieId},
      function (success) {
        request.resolve(success);
      },
      function (failure) {
        request.reject(failure);
      });

    return request.promise;
  };

  service.findMovies = function (searchTerm) {
    var request = q.defer();
    // creates a slightly different get request of the form "http://www.omdbapi.com?s=<imdbID>
    Movies.get({s: searchTerm},
      function (success) {
        request.resolve(success);
      },
      function (failure) {
        request.reject(failure);
      });

    return request.promise;
  };

  service.getFavoritedMovies = function (movieIds) {
    var promises = [];
    movieIds.forEach(function (movieId) {
      promises.push(service.getMovie(movieId));
    });

    // q.all takes an array of promises, resolves them in  their respective order,
    // and returns a new promise of resolved values. The return promise is evaluated
    // in the controller that called this method
    return q.all(promises);
  };

  return service;

}]);
