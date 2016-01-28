(function() {
  angular
    .module('weMessageApp')
    .controller('contactDetailCtrl', contactDetailCtrl);

    contactDetailCtrl.$inject = ['$scope', '$routeParams', '$http', '$location', 'constants'];
    function contactDetailCtrl($scope, $routeParams, $http, $location, constants) {
      var vm = this;
      vm.detailUrl = constants.apiUrl + '/account/' + $routeParams.contactid;
      vm.deleteUrl = constants.apiUrl + '/contacts/' + $routeParams.contactid;
      $http({
        method: 'GET',
        url: vm.detailUrl,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        }
      })
      .then(function successCallback(response) {
        vm.contact = response.data;
      }, function errorCallback(response) {
        console.log(response);
      });
      vm.onClickBack = constants.onClickBack;
      vm.onClickDelete = function() {
        $http({
          method: 'DELETE',
          url: vm.deleteUrl,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
          }
        })
        .then(function successCallback(response) {
          $location.path('/contacts');
        }, function errorCallback(response) {
          console.log('error');
          console.log(response);
        });
        // $http({
        //   method: 'DELETE',
        //   url: vm.deletelUrl,
        //   headers: {
        //     'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        //   }
        // })
        // .then(function successCallback(response) {
        //   $location.path('/contacts');
        // }, function errorCallback(response) {
        //   console.log('error');
        // });
      }
    }
})();
