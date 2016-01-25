(function() {
  angular
    .module('weMessageApp')
    .controller('logoutCtrl', logoutCtrl);

  logoutCtrl.$inject = ['$uibModalInstance', '$location'];
  function logoutCtrl($uibModalInstance, $location) {
    var vm = this;
    vm.onConfirmLogout = function() {
      console.log('confirmed');
      localStorage.clear();
      vm.closeModal();
      $location.path('/');
      return false;
    };
    vm.closeModal = function() {
      $uibModalInstance.close();
    };
  }
})();
