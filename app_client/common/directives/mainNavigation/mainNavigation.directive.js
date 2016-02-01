(function() {
  angular
    .module('weMessageApp')
    .directive('mainNavigation', mainNavigation);

  mainNavigation.$inject = ['$uibModal']
  function mainNavigation($uibModal, scope) {
    var onClickLogout = function onClickLogout() {
      var modalInstance = $uibModal.open({
        templateUrl: '/modals/logout/logout.view.html',
        controller: 'logoutCtrl as vm'
      });
      modalInstance.result.then(function() {
        console.log('then');
      });
    }
    var registrationPopup = function() {
      var modalInstance = $uibModal.open({
        templateUrl: '/modals/register/register.view.html',
        controller: 'registerCtrl as vm'
      });
    };
    var loginPopup = function() {
      var modalInstance = $uibModal.open({
        templateUrl: '/modals/login/login.view.html',
        controller: 'loginCtrl as vm'
      });
    };
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/mainNavigation/mainNavigation.template.html',
      link: function (scope) {
        scope.onClickLogout = onClickLogout;
        scope.loggedIn = localStorage.getItem('loggedIn');
        scope.accountName = localStorage.getItem('accountName');
        scope.registrationPopup = registrationPopup;
        scope.loginPopup = loginPopup;
      }
    };
  }
})();
