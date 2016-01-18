(function() {
  angular.module('weMessageApp', ['ngRoute', 'ngSanitize', 'socket.io', 'ui.bootstrap']);

  function config($routeProvider, $locationProvider, $socketProvider) {
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
    $socketProvider.setConnectionUrl('http://localhost:8080');
  }

  angular
    .module('weMessageApp')
    .config(['$routeProvider', '$locationProvider', '$socketProvider', config]);
})();
