(function() {
  angular
    .module('weMessageApp')
    .controller('contactsCtrl', contactsCtrl);

  contactsCtrl.$inject = ['$scope', '$http', '$uibModal', 'constants'];
  function contactsCtrl($scope, $http, $uibModal, constants) {
    var vm = this;

    vm.accountid = localStorage.getItem('accountid');
    vm.accountName = localStorage.getItem('accountName');
    vm.alertMessage = '';
    vm.apiUrl = constants.apiUrl;
    vm.contactsUrl = vm.apiUrl + '/account-contacts';
    vm.hasContacts = true;
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
      if(vm.contacts && vm.contacts.length > 0) {
        vm.hasContacts = true;
      } else {
        vm.hasContacts = false;
      }
      for(var i= 0; i < vm.contacts.length; i++) {
        var id = vm.contacts[i].id
        vm.contacts[i].conversationUrl = '/account/' + vm.accountid + '/thread/' + vm.contacts[i].name + '/' + id
        var latest = vm.getLatestMessage(id, i);
      }
    }, function errorCallback(response) {
      vm.hasContacts = false;
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
    vm.addContactPopup = function() {
      var modalInstance = $uibModal.open({
        templateUrl: '/modals/addContact/addContact.view.html',
        controller: 'addContactCtrl as vm',
      });
      modalInstance.result.then(function(contact) {
        if(contact.id) {
          contact.conversationUrl = '/account/' + vm.accountid + '/thread/' + contact.name + '/' + contact.id;
          vm.hasContacts = true;
          vm.contacts.push(contact);
        }
      });
    };

  };
})();
