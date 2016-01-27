(function() {
  angular
    .module('weMessageApp')
    .controller('addContactCtrl', addContactCtrl);

  addContactCtrl.$inject = ['$uibModalInstance', '$http', 'constants'];
  function addContactCtrl($uibModalInstance, $http, constants) {
    var vm = this;
    vm.searchUrl = constants.apiUrl + '/accounts/search/'
    vm.createUrl = constants.apiUrl + '/contacts'
    vm.accountid = localStorage.getItem('accountid');
    vm.foundContacts = [];
    vm.numSelected = 0;
    // Get array of selected contacts' ids
    vm.getSelected = function(contacts) {
      var selected = [];
      for(var i = 0; i < contacts.length; i++) {
        if(contacts[i].added) {
          selected.push(contacts[i].id);
        }
      }
      return selected;
    }
    vm.queryKeyUp = function() {
      if(vm.formData.query.length > 0) {
        $http({
          method: 'GET',
          url: vm.searchUrl + vm.formData.query,
        })
        .then(function successCallback(response) {
          vm.foundContacts = response.data;
          // get number of selected contacts
          vm.numSelected = vm.getSelected(vm.foundContacts).length;
        }, function errorCallback(response) {
          console.log(response);
        });
      }
      else {
        // Display no contacts if no query entered
        vm.foundContacts = [];
      }
    }
    vm.selectContact = function(contact) {
      // Toggle added
      contact.added == true ? contact.added = false : contact.added = true;
      // Update selected count
      vm.numSelected = vm.getSelected(vm.foundContacts).length;
    }
    vm.clickAdd = function() {
      var selected = vm.getSelected(vm.foundContacts);
      for(var i = 0; i < selected.length; i++) {
        $http({
          method: 'POST',
          url: vm.createUrl,
          data: {
            adder_id: vm.accountid,
            added_id: selected[i],
          },
          headers: {
             'Authorization': 'Bearer ' + localStorage.getItem('authToken')
           }
        })
        .then(function successCallback(response) {
          // Pass added contact info back to contacts page
          $uibModalInstance.close(response.data);
        }, function errorCallback(response) {
          console.log(response);
        });
      }
    }
    vm.closeModal = function() {
      $uibModalInstance.close();
    };
  }
})();
