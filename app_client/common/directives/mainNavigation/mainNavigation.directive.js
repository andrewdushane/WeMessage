(function() {
  angular
    .module('weMessageApp')
    .directive('mainNavigation', mainNavigation);

  function mainNavigation() {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/mainNavigation/mainNavigation.template.html'
    };
  }
})();
