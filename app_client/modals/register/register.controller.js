(function() {
  angular
    .module('weMessageApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$uibModalInstance', '$http', '$location', 'constants'];
  function registerCtrl($uibModalInstance, $http, $location, constants) {
    var vm = this;
    vm.formData = {};
    vm.registerUrl = constants.apiUrl + '/accounts/'
    vm.onClickRegister = function() {
      vm.formError = '';
      vm.formData = vm.formData || {};
      if(!vm.formData.name || !vm.formData.email || !vm.formData.password) {
        vm.formError = "Please complete all required fields.";
      } else {
        console.log('form submitted');
        $http({
          method: 'POST',
          url: vm.registerUrl,
          data: {
            name: vm.formData.name,
            email: vm.formData.email,
            password: vm.formData.password
          }
        })
        .then(function successCallback(response) {
          console.log(response);
          vm.formError = '';
          localStorage.setItem('accountid', response.data.id);
          localStorage.setItem('accountName', response.data.name);
          var contactsPage = '/account/' + response.data.id + '/contacts';
          $location.path(contactsPage);
        }, function errorCallback(response) {
          if(response.data.email) {
            vm.formError = 'We already have an account associated with that email address.'
          }
          else if(response.data.password) {
            vm.formError = 'Please use a password of six characters or more.'
          } else {
            vm.formError = 'There was an error processing your registration, please try again later.'
          }
          console.log(response);
        });

      }
      return false;
    };

    vm.closeModal = function(account) {
      $uibModalInstance.close(account);
    };

    vm.onClickCancel = function() {
      vm.closeModal(false);
    }
  }
})();
