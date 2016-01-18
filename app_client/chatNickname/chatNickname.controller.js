(function() {
  angular
    .module('weMessageApp')
    .controller('chatNicknameCtrl', chatNicknameCtrl);

  chatNicknameCtrl.$inject = ['$uibModalInstance', '$socket'];
  function chatNicknameCtrl($uibModalInstance, $socket) {
    var vm = this;
    vm.onSubmit = function() {
      vm.formError = '';
      vm.formData = vm.formData || {};
      if(!vm.formData.nickname) {
        vm.formError = "Please enter a nickname."
      } else {
        vm.setNickname(vm.formData);
      }
      return false;
    };
    vm.setNickname = function(formData) {
      if(formData.nickname) {
        $socket.emit('set-nickname', formData.nickname);
      }
      return false;
    };
    vm.closeModal = function(name) {
      $uibModalInstance.close(name);
    };
    $socket.on('nickname-set', function(name) {
      vm.closeModal(name);
    })
  }
})();
