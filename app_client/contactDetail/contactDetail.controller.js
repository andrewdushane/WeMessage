(function() {
  angular
    .module('weMessageApp')
    .controller('contactDetailCtrl', contactDetailCtrl);

    contactDetailCtrl.$inject = ['$scope', '$routeParams', '$http', 'constants'];
    function contactDetailCtrl($scope, $routeParams, $http, constants) {
      var vm = this;
      vm.detailUrl = constants.apiUrl + '/account/' + $routeParams.contactid;
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
    }
})();
