var movieStar = angular.module('movieStar', ['ngRoute','ngResource']);

// Basic routing via angular, provide mappings between routes, and
// associated view/controller.
movieStar.config(['$routeProvider', function (routeProvider) {
  routeProvider.when('/movies/:imdbId', {
    templateUrl: 'partials/movies/show.html',
    controller: 'MoviesController'
  })
  .when('/favorites', {
    templateUrl: 'partials/movies/favorites.html',
    controller: 'MoviesController'
  }).
  otherwise({
    redirectTo: '/',
    templateUrl: 'partials/homepage.html',
    controller: 'HomepageController'
  });
}]);
