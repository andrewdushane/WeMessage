(function() {
  angular
    .module('weMessageApp')
    .controller('chatCtrl', chatCtrl);

  chatCtrl.$inject = ['$scope'];
  function chatCtrl($scope) {
    var vm = this;
  };
})();
