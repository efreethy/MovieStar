// Simple angular directive definition, specifies behavior for scoped parameters,
// and provides a reference to the associated view template. Directive essentially gives
// users the ability to "create" their own html tags with specified behavior and templating.

// USAGE IN VIEW: <search-result movieData="<data>" />

angular.module("movieStar").directive("searchResult", function () {
  return {
    scope: {
      movieData: "="
    },
    templateUrl: "/partials/search/search_result.html"
  };
});
