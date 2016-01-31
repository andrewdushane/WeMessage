(function() {
  angular
    .module('weMessageApp')
    .controller('myAccountCtrl', myAccountCtrl);

    myAccountCtrl.$inject = ['$scope', '$http', '$location', 'constants'];
    function myAccountCtrl($scope, $http, $location, constants) {
      var vm = this;
      vm.accountUrl = constants.apiUrl + '/my-account';
      vm.accountData = {};
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
        $http({
          method: 'PATCH',
          url: vm.accountUrl,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
          },
          data: {
            name: formData.name,
            email: formData.email,
            image: formData.image
          }
        })
        .then(function successCallback(response) {
          console.log(response);
        }, function errorCallback(response) {
          console.log('error');
          console.log(response);
        });
      };
      vm.onClickBack = constants.onClickBack;


      vm.getAccountInfo(token);
    }
})();
