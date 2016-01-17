(function() {
  angular
    .module('weMessageApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope'];
  function homeCtrl($scope) {
    var vm = this;
    vm.pageHeader = {
      title: 'WeMessage',
    };
  };
})();
