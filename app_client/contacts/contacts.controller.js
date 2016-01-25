(function() {
  angular
    .module('weMessageApp')
    .controller('contactsCtrl', contactsCtrl);

  contactsCtrl.$inject = ['$scope', '$http', '$uibModal', 'constants'];
  function contactsCtrl($scope, $http, $uibModal, constants) {
    var vm = this;

    vm.accountid = localStorage.getItem('accountid');
    vm.alertMessage = '';
    vm.apiUrl = constants.apiUrl;
    vm.contactsUrl = vm.apiUrl + '/account-contacts';
    // Get contact list for this account
    $http({
      method: 'GET',
      url: vm.contactsUrl,
      headers: {
         'Authorization': 'Bearer ' + localStorage.getItem('authToken')
       },
    })
    .then(function successCallback(response) {
      vm.contacts = response.data;
      for(var i= 0; i < vm.contacts.length; i++) {
        var id = vm.contacts[i].id
        vm.contacts[i].conversationUrl = '/account/' + vm.accountid + '/thread/' + vm.contacts[i].name + '/' + id
        var latest = vm.getLatestMessage(id, i);
      }
    }, function errorCallback(response) {
      console.log(response);
    });

    vm.getLatestMessage = function(contactid, index) {
      var threadUrl = vm.apiUrl + '/messages/sender/' + vm.accountid + '/recipient/' + contactid + '/latest';
      $http({
        method: 'GET',
        url: threadUrl,
        headers: {
           'Authorization': 'Bearer ' + localStorage.getItem('authToken')
         }
      })
      .then(function successCallback(response) {
        if(response.data) {
          vm.contacts[index].latestMessage = response.data;
        }
      }, function errorCallback(response) {
        console.log(response);
      });
    };

    vm.onClickBack = constants.onClickBack;

    // TO DO: Set up new email invite for inviting to join WeMessage
    // (this one invites to a chatroom)
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
