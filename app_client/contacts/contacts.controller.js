(function() {
  angular
    .module('weMessageApp')
    .controller('contactsCtrl', contactsCtrl);

  contactsCtrl.$inject = ['$scope', '$routeParams', '$http', '$uibModal', 'constants'];
  function contactsCtrl($scope, $routeParams, $http, $uibModal, constants) {
    var vm = this;

    vm.accountid = $routeParams.accountid;
    vm.alertMessage = '';
    vm.apiUrl = constants.apiUrl;
    vm.contactsUrl = vm.apiUrl + '/accounts/' + vm.accountid + '/contacts';
    // Get contact list for this account
    $http({
      method: 'GET',
      url: vm.contactsUrl
    })
    .then(function successCallback(response) {
      console.log(response.data);
      vm.contacts = response.data;
      for(var i= 0; i < vm.contacts.length; i++) {
        vm.getLatestMessage(vm.contacts[i].id);
      }
    }, function errorCallback(response) {
      console.log(response);
    });

    vm.getLatestMessage = function(contactid) {
      var threadUrl = vm.apiUrl + '/messages/sender/' + vm.accountid + '/recipient/' + contactid + '/latest';
      $http({
        method: 'GET',
        url: threadUrl
      })
      .then(function successCallback(response) {
        console.log(response.data);
      }, function errorCallback(response) {
        console.log(response);
      });
    };

    vm.emailInvitePopup = function() {
      var modalInstance = $uibModal.open({
        templateUrl: '/emailInvite/emailInvite.view.html',
        controller: 'emailInviteCtrl as vm',
        resolve: {
          senderInfo : function() {
            return {
              sender : vm.nickname,
              chatUrl : window.location.href
            };
          }
        }
      });
      modalInstance.result.then(function(message) {
        if(message) {
          var alert = {
            content: message,
            selfClasses: 'bold text-center',
            showNickname: false,
            username: ''
          };
          vm.messageThread.push(alert);
        }
      });
    };

  };
})();
