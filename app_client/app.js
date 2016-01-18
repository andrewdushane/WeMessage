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
    var port = '';
    if(window.location.hostname == 'localhost') {
      port = ':8080';
    }
    $socketProvider.setConnectionUrl(window.location.hostname + port);
  }

  angular
    .module('weMessageApp')
    .config(['$routeProvider', '$locationProvider', '$socketProvider', config]);
})();
