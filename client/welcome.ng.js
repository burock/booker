angular.module('booker').controller('WelcomeCtrl', ['$scope', 
     '$rootScope','$translate', '$reactive',
    function ($scope, $rootScope, $translate, $reactive) {
      $reactive(this).attach($scope);
      
    }]
);