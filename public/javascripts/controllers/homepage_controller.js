angular.module('movieStar').controller('HomepageController', ['$scope', 'omdbApiService',
  function (scope, omdbApiService) {
  scope.searchTerm = "";
  scope.searchResults = [];

  scope.search = function () {
    // destroy search results if search term is less than two characters
    if (scope.searchTerm.length < 2) {
      scope.searchResults = [];
      return;
    }

    // use api service to fetch movies, and attach to scope
    // (the view uses variables on scope to populate information on page)
    omdbApiService.findMovies(scope.searchTerm).then(function (result) {
      scope.searchResults = result.Search;
    });
  };

}]);
