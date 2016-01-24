(function() {
  angular
    .module('weMessageApp')
    .controller('newChatCtrl', newChatCtrl);

  newChatCtrl.$inject = ['$uibModalInstance', '$location'];
  function newChatCtrl($uibModalInstance, $location) {
    var vm = this;
    vm.onSubmit = function() {
      vm.formError = '';
      vm.formData = vm.formData || {};
      if(!vm.formData.roomName) {
        vm.formError = "Please enter a name for your chatroom."
      } else {
        vm.formError = '';
        $location.path('/chat/' + vm.formData.roomName);
      }
      return false;
    };
    vm.closeModal = function() {
      $uibModalInstance.close();
    };
  }
})();
