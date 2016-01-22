(function() {
  angular
    .module('weMessageApp')
    .controller('emailInviteCtrl', emailInviteCtrl);

  emailInviteCtrl.$inject = ['$uibModalInstance', '$http', 'senderInfo'];
  function emailInviteCtrl($uibModalInstance, $http, senderInfo) {
    var vm = this;
    vm.formData = {};
    vm.formData.sender = senderInfo.sender;
    vm.chatUrl = senderInfo.chatUrl;
    vm.onClickSend = function() {
      console.log('why');
      vm.formError = '';
      vm.formData = vm.formData || {};
      if(!vm.formData.sender || !vm.formData.recipientName || !vm.formData.recipientEmail) {
        vm.formError = "Please complete all fields.";
      } else {
        vm.sendMail(vm.formData);
        vm.closeModal('Your invitation was sent.');
      }
      return false;
    };
    vm.sendMail = function(data) {
      var mailData = {
        sender: data.sender,
        chatUrl: vm.chatUrl,
        recipientName: data.recipientName,
        recipientEmail: data.recipientEmail
      }
      $http.post('/email/invite-to-chat', mailData);
    }
    vm.closeModal = function(message) {
      $uibModalInstance.close(message);
    };
    vm.onClickCancel = function() {
      vm.closeModal(false);
    }
    vm.testFunction = function() {
      console.log('test');
    }
  }
})();
