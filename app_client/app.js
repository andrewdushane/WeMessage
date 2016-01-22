(function() {
  angular.module('weMessageApp', ['ngRoute', 'ngSanitize', 'socket.io', 'ui.bootstrap']);

  function config($routeProvider, $locationProvider, $socketProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/chat/:roomid', {
        templateUrl: '/chat/chat.view.html',
        controller: 'chatCtrl',
        controllerAs: 'vm'
      })
      .when('/account/:accountid/contacts', {
        templateUrl: '/contacts/contacts.view.html',
        controller: 'contactsCtrl',
        controllerAs: 'vm'
      })
      .when('/account/:accountid/thread/:contactName/:contactid', {
        templateUrl: '/conversation/conversation.view.html',
        controller: 'conversationCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    var port = ':8080';
    $socketProvider.setConnectionUrl(window.location.hostname + port);
  }

  angular
    .module('weMessageApp')
    .config(['$routeProvider', '$locationProvider', '$socketProvider', config]);
})();
