(function() {
  angular
    .module('weMessageApp')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$uibModalInstance', '$http', '$location', 'constants'];
  function loginCtrl($uibModalInstance, $http, $location, constants) {
    var vm = this;
    vm.formData = {};
    vm.loginUrl = constants.apiUrl + '/authenticate/'
    vm.onClickLogin = function() {
      vm.formError = '';
      vm.formData = vm.formData || {};
      if(!vm.formData.email || !vm.formData.password) {
        vm.formError = "Please complete all fields.";
      } else {
        console.log('form submitted');
        $http({
          method: 'POST',
          url: vm.loginUrl,
          data: {
            email: vm.formData.email,
            password: vm.formData.password
          }
        })
        .then(function successCallback(response) {
          vm.formError = '';
          console.log(response);
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('authToken', response.data.auth_token);
          localStorage.setItem('accountid', response.data.account.id);
          localStorage.setItem('accountName', response.data.account.name);
          var contactsPage = '/account/' + response.data.id + '/contacts';
          $location.path(contactsPage);
        }, function errorCallback(response) {
          console.log(response);
          if(response.data.errors) {
            vm.formError = response.data.errors[0];
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
