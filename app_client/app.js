(function() {
  angular.module('weMessageApp', ['ngRoute', 'ngSanitize']);

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/chat', {
        templateUrl: 'chat/chat.view.html',
        controller: 'chatCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }

  angular
    .module('weMessageApp')
    .config(['$routeProvider', '$locationProvider', config]);
})();
