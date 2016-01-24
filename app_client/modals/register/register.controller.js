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
          vm.formError = '';
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('authToken', response.data.auth_token);
          localStorage.setItem('accountid', response.data.account.id);
          localStorage.setItem('accountName', response.data.account.name);
          $location.path('/contacts');
        }, function errorCallback(response) {
          if(response.data.email) {
            vm.formError = 'We already have an account associated with that email address.'
          }
          else if(response.data.password) {
            vm.formError = 'Please use a password of six characters or more.'
          } else {
            vm.formError = 'There was an error processing your registration, please try again later.'
          }
        });

      }
      return false;
    };

    vm.onClickCancel = function() {
      $uibModalInstance.close();
    }
  }
})();
