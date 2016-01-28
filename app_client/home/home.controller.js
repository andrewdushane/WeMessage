(function() {
  angular
    .module('weMessageApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', '$uibModal', '$http', 'constants'];
  function homeCtrl($scope, $uibModal, $http, constants) {
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

    // Wake up the API server if it's asleep
    $http({
      method: 'GET',
      url: constants.apiUrl
    })
    .then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
    };
})();
