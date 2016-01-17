(function() {
  angular
    .module('weMessageApp')
    .directive('mainFooter', ['currentTime', mainFooter]);

  mainFooter.$inject = ['currentTime'];
  function mainFooter(currentTime) {
    // var dateToday = Date.now();
    return {
      restrict: 'EA',
      scope: {},
      link: function (scope) {
        scope.todaysDate = currentTime.now;
      },
      templateUrl: '/common/directives/mainFooter/mainFooter.template.html'
    };
  }
})();
