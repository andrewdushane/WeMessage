(function() {
  angular
    .module('weMessageApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', '$uibModal'];
  function homeCtrl($scope, $uibModal) {
    var vm = this;
    vm.newChatPopup = function() {
      var modalInstance = $uibModal.open({
        templateUrl: '/modals/newChat/newChat.view.html',
        controller: 'newChatCtrl as vm'
      });
    };
    vm.registrationPopup = function() {
      var modalInstance = $uibModal.open({
        templateUrl: '/modals/register/register.view.html',
        controller: 'registerCtrl as vm'
      });
    };
    vm.loginPopup = function() {
      var modalInstance = $uibModal.open({
        templateUrl: '/modals/login/login.view.html',
        controller: 'loginCtrl as vm'
      });
    };
  };
})();
