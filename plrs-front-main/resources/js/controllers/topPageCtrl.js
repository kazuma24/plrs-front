angular.module('topPageApp')
.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
})
.config(function($routeProvider) {
    $routeProvider
    .when('/', {
      controller : 'topPageMainCtlr',
      templateUrl : '../inner/daylyQiita.html'
    })
    .when('/daylyQiita', {
        controller : 'daylyQiitaCtlr',
        templateUrl : '../inner/daylyQiita.html'
    })
    .when('/weeklyQiita', {
        controller : 'weeklyQiitaCtlr',
        templateUrl : '../inner/weeklyQiita.html'
    })
    .when('/monthlyQiita', {
        controller : 'monthlyQiitaCtlr',
        templateUrl : '../inner/monthlyQiita.html'
    })
    .when('/github', {
        controller : 'daylyGitHubCtlr',
        templateUrl : '../inner/dailyGitHub.html'
    })
    .when('/daylyGitHub', {
        controller : 'daylyGitHubCtlr',
        templateUrl : '../inner/dailyGitHub.html'
    })
    .when('/weeklyGitHub', {
        controller : 'weeklyGitHubCtlr',
        templateUrl : '../inner/weeklyGitHub.html'
    })
    .when('/monthlyGitHub', {
        controller : 'monthlyGitHubCtlr',
        templateUrl : '../inner/monthlyGitHub.html'
    })
    .when('/languageDetails/:languageName', {
        controller : 'languageDetailsCtlr',
        templateUrl : '../inner/languageDetails.html'
    })
    .when('/contactAs', {
        templateUrl : '../inner/contactAs.html'
    })
    .when('/privacyPolicy', {
        templateUrl : '../inner/privacyPolicy.html'
    })
})
//トップページ初期表示
.controller('topPageMainCtlr', ['$scope', '$log', '$location', '$sce', 'topPageService', 'FQDN', 'TEXTDATA', function($scope, $log, $location, $sce, topPageService, FQDN, TEXTDATA){

    $log.info('topPageMainCtlr..')

    //タグのボタン表示
    topPageService.tagColorCoding($scope, $location);

    // ヘッダーのハンバーガーメニューのｈｔｍｌ生成
    $scope.languageDetailsNavMenuHtml = topPageService.generateLanguageDetailNavMenuHtml()

    
    topPageService.runApi(FQDN.RANDOM_AFFILIATE_URL_API)
    .success(function(resData) {
        $scope.afiTag1 = $sce.trustAs($sce.HTML, resData.affiliateTag1)
        $scope.afiTag2 = $sce.trustAs($sce.HTML, resData.affiliateTag2)
    })
    .error(function(data) {
        $log.info('error ' + data);
    })

    topPageService.runApi(FQDN.DAILY_QIITA_RANK_API, 0)
    .success(function(resData) {

        if(topPageService.returnValueScrutiny(resData, 'qiita')) {
            $scope.errorFlag = true
            $scope.message = TEXTDATA.NODATA_MESSAGE
        }else {
            $scope.errorFlag = false
            //レスポンスデータをライブラリようにデータ詰め替え
            let refillMapData = topPageService.responseDataRefill(resData, TEXTDATA.QIITA_GRAPH_LABEL);
            //グラフ生成
            topPageService.graphGeneration(refillMapData, TEXTDATA.QIITA_GRAPH_TITLE);
            //表示用オブジェクト生成
            $scope.rankingDispObj = topPageService.qiitaRankingDispObjctGeneration(resData);
            //日付
            $scope.period = '(' + TEXTDATA.FROM_YESTERDAY_TO_TODAY() + ')';
            //ペジネーション
            topPageService.pagetionFunctionGeneration($scope);

            //言語詳細ページ遷移
            $scope.languageDetailPageMove = function(languageName) {
                let ln = languageName === "C#" ? 'csharp': languageName
                $location.url('languageDetails/' + ln)
            }

        }
        
   

    })
    .error(function(data) {
        $log.info('error ' + data);
        $scope.errorFlag = true
        $scope.message = TEXTDATA.ERROR_MESSAGE
    })

}])
//Qiita毎日ランキングランキング表示
.controller('daylyQiitaCtlr', ['$scope', '$log', '$location', 'topPageService', 'FQDN', 'TEXTDATA', function($scope, $log, $location, topPageService, FQDN, TEXTDATA){

    $log.info('daylyQiitaCtlr..')

    //タグのボタン表示
    topPageService.tagColorCoding($scope, $location);

    topPageService.runApi(FQDN.DAILY_QIITA_RANK_API, 0)
    .success(function(resData) {

        if(topPageService.returnValueScrutiny(resData, 'qiita')) {
            $scope.errorFlag = true
            $scope.message = TEXTDATA.NODATA_MESSAGE
        }else {
            $scope.errorFlag = false
             //レスポンスデータをライブラリようにデータ詰め替え
            let refillMapData = topPageService.responseDataRefill(resData, TEXTDATA.QIITA_GRAPH_LABEL);
            //グラフ生成
            topPageService.graphGeneration(refillMapData, TEXTDATA.QIITA_GRAPH_TITLE);
            //表示用オブジェクト生成
            $scope.rankingDispObj = topPageService.qiitaRankingDispObjctGeneration(resData);
            //日付
            $scope.period = '(' + TEXTDATA.FROM_YESTERDAY_TO_TODAY() + ')';
            //ペジネーション
            topPageService.pagetionFunctionGeneration($scope);
            //言語詳細ページ遷移
            $scope.languageDetailPageMove = function(languageName) {
                let ln = languageName === "C#" ? 'csharp': languageName
                $location.url('languageDetails/' + ln)
            }

        }
       

    })
    .error(function(data) {
        $log.info('error ' + data);
        $scope.errorFlag = true
        $scope.message = TEXTDATA.ERROR_MESSAGE
    })
        
    
}])
//Qiita週間ランキングランキング表示
.controller('weeklyQiitaCtlr', ['$scope', '$log', '$location', 'topPageService', 'FQDN', 'TEXTDATA', function($scope, $log, $location, topPageService, FQDN, TEXTDATA){

    $log.info('weeklyQiitaCtlr..')

    //タグのボタン表示
    topPageService.tagColorCoding($scope, $location);

    topPageService.runApi(FQDN.WEEKLY_QIITA_RANK_API, 1)
    .success(function(resData) {

        if(topPageService.returnValueScrutiny(resData, 'qiita')) {
            $scope.errorFlag = true
            $scope.message = TEXTDATA.NODATA_MESSAGE
        }else {
            $scope.errorFlag = false
            //レスポンスデータをライブラリようにデータ詰め替え
            let refillMapData = topPageService.responseDataRefill(resData, TEXTDATA.QIITA_GRAPH_LABEL);
            //グラフ生成
            topPageService.graphGeneration(refillMapData, TEXTDATA.QIITA_GRAPH_TITLE);
            //表示用オブジェクト生成
            $scope.rankingDispObj = topPageService.qiitaRankingDispObjctGeneration(resData);
            //日付
            $scope.period = '(' + TEXTDATA.FROM_LAST_WEEK_TO_THIS_WEEK() + ')';
            //ペジネーション
            topPageService.pagetionFunctionGeneration($scope);
            //言語詳細ページ遷移
            $scope.languageDetailPageMove = function(languageName) {
                let ln = languageName === "C#" ? 'csharp': languageName
                $location.url('languageDetails/' + ln)
            }
        }
      
        
    })
    .error(function(data) {
        $log.info('error ' + data);
        $scope.errorFlag = true
        $scope.message = TEXTDATA.ERROR_MESSAGE
    })
}])
//Qiita月間ランキングランキング表示
.controller('monthlyQiitaCtlr', ['$scope', '$log', '$location', 'topPageService', 'FQDN', 'TEXTDATA', function($scope, $log, $location, topPageService, FQDN, TEXTDATA){

    $log.info('monthlyQiitaCtlr..')

    //タグのボタン表示
    topPageService.tagColorCoding($scope, $location)

    topPageService.runApi(FQDN.MONTHLY_QIITA_RANK_API, 1)
    .success(function(resData) {

        if(topPageService.returnValueScrutiny(resData, 'qiita')) {
            $scope.errorFlag = true
            $scope.message = TEXTDATA.NODATA_MESSAGE
        }else {
            $scope.errorFlag = false
             //レスポンスデータをライブラリようにデータ詰め替え
            let refillMapData = topPageService.responseDataRefill(resData, TEXTDATA.QIITA_GRAPH_LABEL);
            //グラフ生成
            topPageService.graphGeneration(refillMapData, TEXTDATA.QIITA_GRAPH_TITLE);
            //表示用オブジェクト生成
            $scope.rankingDispObj = topPageService.qiitaRankingDispObjctGeneration(resData);
            //日付
            $scope.period = '(' + TEXTDATA.FROM_LAST_MONTH_TO_THIS_MONHT() + ')';
            //ペジネーション
            topPageService.pagetionFunctionGeneration($scope);
           //言語詳細ページ遷移
            $scope.languageDetailPageMove = function(languageName) {
                let ln = languageName === "C#" ? 'csharp': languageName
                $location.url('languageDetails/' + ln)
                }
            }
     
       
    })
    .error(function(data) {
        $log.info('error ' + data);
        $scope.errorFlag = true
        $scope.message = TEXTDATA.ERROR_MESSAGE
    })
}])
//GitHub毎日ランキングランキング表示
.controller('daylyGitHubCtlr', ['$scope', '$log', '$location', 'topPageService', 'FQDN', 'TEXTDATA', function($scope, $log, $location, topPageService, FQDN, TEXTDATA){

    $log.info('daylyGitHubCtrl..')

    //タグのボタン表示
    topPageService.tagColorCoding($scope, $location)

    topPageService.runApi(FQDN.DAILY_GITHUB_RANK_API, 0)
    .success(function(resData) {

        if(topPageService.returnValueScrutiny(resData)) {
            $scope.errorFlag = true
            $scope.message = TEXTDATA.NODATA_MESSAGE
        }else {
            $scope.errorFlag = false
            let refillMapData = topPageService.responseGitHubDataRefill(resData, TEXTDATA.GITHUB_GRAPH_LABEL);
            //グラフ生成
            topPageService.graphGeneration(refillMapData, TEXTDATA.GITHUB_GRAPH_TITLE);
            //表示用オブジェクト生成
            $scope.rankingDispObj = topPageService.gitHubRankingDispObjctGeneration(resData);
            //日付
            $scope.period = '(' + TEXTDATA.FROM_YESTERDAY_TO_TODAY() + ')';
            //ペジネーション
            topPageService.pagetionFunctionGeneration($scope);
            //言語詳細ページ遷移
            $scope.languageDetailPageMove = function(languageName) {
                let ln = languageName === "C#" ? 'csharp': languageName
                $location.url('languageDetails/' + ln)
            }
        }
    
        
    })
    .error(function(data) {
        $log.info('error ' + data);
        $scope.errorFlag = true
        $scope.message = TEXTDATA.ERROR_MESSAGE
    })
}])
//GitHub週間ランキングランキング表示
.controller('weeklyGitHubCtlr', ['$scope', '$log', '$location', 'topPageService', 'FQDN', 'TEXTDATA', function($scope, $log, $location, topPageService, FQDN, TEXTDATA){

    $log.info('weeklyGitHubCtlr..')

    //タグのボタン表示
    topPageService.tagColorCoding($scope, $location)

    topPageService.runApi(FQDN.WEEKLY_GITHUB_RANK_API, 1)
    .success(function(resData) {

        $log.info(JSON.stringify(resData))

        if(topPageService.returnValueScrutiny(resData)) {
            $scope.errorFlag = true
            $scope.message = TEXTDATA.NODATA_MESSAGE
        }else {
            $scope.errorFlag = false
            //レスポンスデータをライブラリようにデータ詰め替え
            let refillMapData = topPageService.responseGitHubDataRefill(resData, TEXTDATA.GITHUB_GRAPH_LABEL);
            //グラフ生成
            topPageService.graphGeneration(refillMapData, TEXTDATA.GITHUB_GRAPH_TITLE);
            //表示用オブジェクト生成
            $scope.rankingDispObj = topPageService.gitHubRankingDispObjctGeneration(resData);
            //日付
            $scope.period = '(' + TEXTDATA.FROM_LAST_WEEK_TO_THIS_WEEK() + ')';
            //ペジネーション
            topPageService.pagetionFunctionGeneration($scope);
            //言語詳細ページ遷移
            $scope.languageDetailPageMove = function(languageName) {
                let ln = languageName === "C#" ? 'csharp': languageName
                $location.url('languageDetails/' + ln)
            }
        }
     

    })
    .error(function(data) {
        $log.info('error ' + data);
        $scope.errorFlag = true
        $scope.message = TEXTDATA.ERROR_MESSAGE
    })
}])
//GitHub月間ランキングランキング表示
.controller('monthlyGitHubCtlr', ['$scope', '$log', '$location', 'topPageService', 'FQDN', 'TEXTDATA', function($scope, $log, $location, topPageService, FQDN, TEXTDATA){

    $log.info('monthlyGitHubCtlr..')

    //タグのボタン表示
    topPageService.tagColorCoding($scope, $location)

    topPageService.runApi(FQDN.MONTHLY_GITHUB_RANK_API, 1)
    .success(function(resData) {

        if(topPageService.returnValueScrutiny(resData)) {
            $scope.errorFlag = true
            $scope.message = TEXTDATA.NODATA_MESSAGE
        }else {
            $scope.errorFlag = false
            //レスポンスデータをライブラリようにデータ詰め替え
            let refillMapData = topPageService.responseGitHubDataRefill(resData, TEXTDATA.GITHUB_GRAPH_LABEL);
            //グラフ生成
            topPageService.graphGeneration(refillMapData, TEXTDATA.GITHUB_GRAPH_TITLE);
            //表示用オブジェクト生成
            $scope.rankingDispObj = topPageService.gitHubRankingDispObjctGeneration(resData);
            //日付
            $scope.period = '(' + TEXTDATA.FROM_LAST_MONTH_TO_THIS_MONHT() + ')';
            //ペジネーション
            topPageService.pagetionFunctionGeneration($scope);
            //言語詳細ページ遷移
            $scope.languageDetailPageMove = function(languageName) {
                let ln = languageName === "C#" ? 'csharp': languageName
                $location.url('languageDetails/' + ln)
            }
        }

        

    })
    .error(function(data) {
        $log.info('error ' + data);
        $scope.errorFlag = true
        $scope.message = TEXTDATA.ERROR_MESSAGE
    })
}])
//言語詳細ページ
.controller('languageDetailsCtlr', ['$scope', '$log', '$routeParams', '$sce', '$location', 'topPageService', 'FQDN', 'TEXTDATA', function($scope, $log, $routeParams, $sce, $location, topPageService, FQDN, TEXTDATA){

    $log.info('languageDetailsCtlr..')

    scrollTo(0,420);

    let languageId = topPageService.languageToId($routeParams.languageName)
    if(languageId === 0) {
        $location.url('/')
    }

    topPageService.getlanguageDetail(FQDN.LANGUAGE_DETAIL_API, languageId)
    .success(function(resData) {
            
        $scope.languageName = resData.language_name
        $scope.imgUrl = resData.img_url
        $scope.createdAt = (resData.created_at).substr(0,10)
        $scope.updatedAt = (resData.updated_at).substr(0,10)

        //HTMLバインド
        $scope.feature = $sce.trustAs($sce.HTML, resData.feature)
        $scope.abilityTodo = $sce.trustAs($sce.HTML, resData.ability_todo)
        $scope.annualIncome = $sce.trustAs($sce.HTML, resData.annual_income)
        $scope.review = $sce.trustAs($sce.HTML, resData.review)
        if(resData.certificate === "TBD") {
            $scope.certificateSection = false;
        }else {
            $scope.certificateSection = true;
        }
        $scope.certificate = $sce.trustAs($sce.HTML, resData.certificate)
        $scope.howToStudy = $sce.trustAs($sce.HTML, resData.how_to_study)

    })
    .error(function(data) {
        $log.info('error ' + data);
        $scope.errorFlag = true
        $scope.message = TEXTDATA.ERROR_MESSAGE
    })
}])
