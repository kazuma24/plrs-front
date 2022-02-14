angular.module('topPageApp')
.directive('sectionDrctv', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '../resources/js/directive/section.html'
    }
})
.directive('pagenetionDrctv', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '../resources/js/directive/pagenetion.html'
    }
})
.directive('topDrctv', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '../resources/js/directive/topcontent.html'
    }
})
.directive('githubtagDrctv', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '../resources/js/directive/gitHubTag.html'
    }
})
.directive('qiitatagDrctv', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '../resources/js/directive/qiitaTag.html'
    }
})
.directive('errorDrctv', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '../resources/js/directive/error.html'
    }
})