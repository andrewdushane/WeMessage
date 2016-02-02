(function() {
  angular
    .module('weMessageApp')
    .controller('logoutCtrl', logoutCtrl);

  logoutCtrl.$inject = ['$uibModalInstance', '$location', '$scope'];
  function logoutCtrl($uibModalInstance, $location, $scope) {
    var vm = this;
    vm.onConfirmLogout = function() {

      vm.closeModal();

      return false;
    };
    vm.closeModal = function() {
      $uibModalInstance.close();
      $scope.$apply(function() {
        localStorage.clear();
        $location.path('/');
      })
    };
  }
})();
