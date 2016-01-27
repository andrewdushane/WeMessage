(function() {
  angular
    .module('weMessageApp')
    .directive('messageEntry', messageEntry);

  function messageEntry() {
    return {
      restrict: 'EA',
      require: 'ngModel',
      templateUrl: '/common/directives/messageEntry/messageEntry.template.html'
    };
  }
})();
