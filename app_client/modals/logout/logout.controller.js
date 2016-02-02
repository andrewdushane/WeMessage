(function() {
  angular
    .module('weMessageApp')
    .controller('logoutCtrl', logoutCtrl);

  logoutCtrl.$inject = ['$uibModalInstance', '$location', '$route'];
  function logoutCtrl($uibModalInstance, $location, $route) {
    var vm = this;
    vm.onConfirmLogout = function() {
      console.log($location.path());
      vm.closeModal();
      localStorage.clear();
      // refresh model if logout is initiated from the homepage
      if($location.path() == '/') {
        $route.reload();
      // otherwise redirect to the home page
      } else {
        $location.path('/');
      }
      return false;
    };
    vm.closeModal = function() {
      $uibModalInstance.close();
    };
  }
})();
