angular.module("booker").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('admin', {
                url: '/admin',
                templateUrl: 'client/booker/views/admin.ng.html',
                controller: 'AdminCtrl'
            }) 
            .state('welcome', {
                url: '/welcome',
                templateUrl: 'client/welcome.ng.html',
                controller: 'WelcomeCtrl'
            })            
            .state('login', {
                url: '/login',
                templateUrl: 'client/users/views/login.ng.html',
                controller: 'LoginCtrl',
                controllerAs: 'lc'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'client/users/views/register.ng.html',
                controller: 'RegisterCtrl',
                controllerAs: 'rc'
            })
            .state('resetpw', {
                url: '/resetpw',
                templateUrl: 'client/users/views/reset-password.ng.html',
                controller: 'ResetCtrl',
                controllerAs: 'rpc'
            })
            .state('logout', {
                url: '/logout',
                resolve: {
                    logout: function($state) {
                        Meteor.logout(function() {
                            $state.go('login', {}, {reload: true});
                        });
                    }
                }
            });

        $urlRouterProvider.otherwise("/login");
        
    }
]);