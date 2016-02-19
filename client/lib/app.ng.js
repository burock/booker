'use strict';

var booker = angular.module('booker', ['angular-meteor', 'ui.router', 'accounts.ui','ngMaterial', 'pascalprecht.translate',
    'angularUtils.directives.dirPagination', 'ui.calendar', 'ngFileUpload'
]);

booker.config(['$translateProvider',
    function($translateProvider) {

        $translateProvider
            .useLoaderCache(true)
            .useStaticFilesLoader({
                prefix: '/locale/',
                suffix: '.json'
            })
            .registerAvailableLanguageKeys(['al','en','tr','de'], {
                'al'  : 'al',
                'en'  : 'en',
                'tr'  : 'tr',
                'de'  : 'de'
            })
            .preferredLanguage('tr')
            //.determinePreferredLanguage()
            .fallbackLanguage('en');
            
        $translateProvider.useSanitizeValueStrategy('escape');

    }
]);

booker.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('DD/MM/YYYY');
    };
});

booker.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('deep-orange', {
            'default' : '900'
        }).accentPalette('green', {'default' : '900'}).warnPalette('purple', {'default' : '900'});
});

booker.run(function($rootScope) {
    $rootScope.isLoggedIn = (Meteor.userId() !== null);
    $rootScope.currentUserId = Meteor.userId();
    $rootScope.categories = [
            { name : '' },
            { name : 'Books' },
            { name : 'Cars' },
            { name : 'Rooms' },
            { name : 'Planes' },
            { name : 'Records' },
            { name : 'Movies' },
            { name : 'Other' },
    ]; 
});