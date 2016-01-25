(function() {
  angular
    .module('weMessageApp')
    .controller('chatHomeCtrl', chatHomeCtrl);

    chatHomeCtrl.$inject = ['$scope', 'constants'];
    function chatHomeCtrl($scope, constants) {
      var vm = this;
      vm.pageTitle = 'WeMessage Chat';
      vm.onClickBack = constants.onClickBack;
    }
})();
