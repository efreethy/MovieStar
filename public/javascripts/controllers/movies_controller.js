angular.module('movieStar').controller('MoviesController', ['$scope', '$rootScope', '$routeParams', 'omdbApiService', 'movieService',
  function (scope, rootScope, routeParams, omdbApiService, movieService) {
  scope.loadingMovie = true;
  scope.logInBoxVisible = false;
  scope.movieIsFavorited = false;
  scope.favorites = [];
  scope.movie = {};

  scope.initialize = function () {
    var movieId = routeParams.imdbId;
    omdbApiService.getMovie(movieId).then(function (result) {
      scope.movie = result;

      loadFavoriteData();
    });
  };

  scope.initializeFavorites = function () {
    var movieIds = getMovieIds();

    omdbApiService.getFavoritedMovies(movieIds).then(function (results) {
      scope.favorites = results;
    });
  };

  function loadFavoriteData() {
    if (rootScope.sessionUser) {
      var movieIds = getMovieIds();
      var movieIsFavorited = checkIfMovieIsFavorited(movieIds);
      if (movieIsFavorited) {
        scope.movieIsFavorited = true;
      }
    }
    scope.loadingMovie = false;
  }

  function checkIfMovieIsFavorited (movieIds) {
    var movieFound = movieIds.filter(function (imdbID) {
      return imdbID === routeParams.imdbId;
    });
    return movieFound.length > 0;
  }

  function getMovieIds() {
      return rootScope.sessionUser.MovieFavorites.map(function (favorite) {
        return favorite.movie_id;
      });
  }


}]);
