(function() {
  angular
    .module('weMessageApp')
    .controller('notFoundCtrl', notFoundCtrl);

    notFoundCtrl.$inject = ['$scope', 'constants'];
    function notFoundCtrl($scope, constants) {
      var vm = this;
      vm.pageTitle = 'Page Not Found';
      vm.onClickBack = constants.onClickBack;
      vm.content = {};
      vm.content.header = 'Ahh, now you&rsquo;ve done it!';
      vm.content.main = 'Head to <a href="/#">the homepage</a> and try again.';
    }
})();
