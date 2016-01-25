(function() {
  angular
    .module('weMessageApp')
    .directive('mainNavigation', mainNavigation);

  mainNavigation.$inject = ['$uibModal'];
  function mainNavigation($uibModal) {
    var onClickLogout = function onClickLogout() {
      console.log('whattup');
      var modalInstance = $uibModal.open({
        templateUrl: '/modals/logout/logout.view.html',
        controller: 'logoutCtrl as vm'
      });
    }
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/mainNavigation/mainNavigation.template.html',
      link: function (scope) {
        scope.onClickLogout = onClickLogout;
        scope.loggedIn = localStorage.getItem('loggedIn');
      }
    };
  }
})();
