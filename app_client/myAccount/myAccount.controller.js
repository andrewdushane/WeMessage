(function() {
  angular
    .module('weMessageApp')
    .controller('myAccountCtrl', myAccountCtrl);

    myAccountCtrl.$inject = ['$scope', '$http', '$location', 'constants'];
    function myAccountCtrl($scope, $http, $location, constants) {
      var vm = this;
      vm.accountUrl = constants.apiUrl + '/my-account';
      vm.accountData = {};
      vm.newImage = false;
      vm.alertMessage = '';
      var token = localStorage.getItem('authToken');
      vm.getAccountInfo = function(token) {
        if(token) {
          $http({
            method: 'GET',
            url: vm.accountUrl,
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
          .then(function successCallback(response) {
            vm.accountData = response.data;
            console.log(vm.accountData);
          }, function errorCallback(response) {
            console.log(response);
          });
        }
        // redirect to home if not logged in
        else {
          $location.path('/');
        }
      }
      vm.onClickUpdate = function() {
        var data = {
          name: vm.formData.name,
          email: vm.formData.email
        };
        if(vm.newImage) {
          data.image = vm.image
        }
        if(vm.formData.password != '') {
          data.password = vm.formData.password
        }
        $http({
          method: 'POST',
          url: vm.accountUrl,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
          },
          data: data
        })
        .then(function successCallback(response) {
          console.log(response);
          vm.alertClass = 'text-success';
          vm.alertMessage = 'Account updated.'
          vm.accountData = response.data;
        }, function errorCallback(response) {
          vm.alertClass = 'text-danger';
          if(response.data.password) {
            vm.alertMessage = 'Please use a password between 6 and 20 characters.';
          } else {
            vm.alertMessage = 'There was an error updating your account. Please try again later.';
          }
          console.log('error');
          console.log(response);
        });
      };
      vm.onClickBack = constants.onClickBack;


      vm.getAccountInfo(token);
    }
})();
