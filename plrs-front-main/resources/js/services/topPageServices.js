angular.module('topPageApp')
.service('topPageService',['$http','$log', '$sce','GRAPH_BACK_COLOR', 'TEXTDATA', function($http, $log, $sce, GRAPH_BACK_COLOR, TEXTDATA) {
    
    //api実行
    this.runApi = function(url, param = null) {
        
        let acsessUrl = param === null ? url : url + "/" + param;

        return $http({
            url: acsessUrl,
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
        })
    },
    // 言語詳細HTML取得API
    this.getlanguageDetail = function(url, languageId) {
        return $http({
            url: url + '/' + languageId,
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
        })
    },
    // Qiitaランキング incrementの昇順でソートして、同じ場合は文字のアルファベットの昇順で表示
    this.qiitaFixedSort = function(array) {
        array.sort(function(a,b) {
            // 記事総数の昇順でソート
            if(a.total_posts !== b.total_posts) {
                return a.total_posts < b.total_posts ? 1 : -1;
            }
            // 記事総数が同じ場合　名前のアルファベット順でソート
            return a.language_name < b.language_name ? -1 : 1;
        })
        return array;
    },
    // GitHubランキング total_repositoriesの昇順でソートして、同じ場合は文字のアルファベットの昇順で表示
    this.gitHubFixedSort = function(array) {
        array.sort(function(a,b) {
            //　リポジトリ総数でソート
            if(a.total_repositories !== b.total_repositories) {
                return a.total_repositories < b.total_repositories ? 1 : -1;
            }
            // リポジトリ数が同じ場合　名前アルファベット順ソート
            return a.language_name < b.language_name ? -1 : 1;
        })
        return array;
    },
    //Qiitaレスポンスデータ、ライブラリ用に変換
    this.responseDataRefill = function(data, labels) {

        //返却用Map
        let refillMapData = new Map();
        // データ保持配列
        let chartLabels = new Array();
        let chartData = new Array();
        let chartBackGroundColor = new Array();
        let chartBorderColor = new Array();
        
        //incrementalで昇順ソート
        let self = this;
        data = self.qiitaFixedSort(data)

        //データ詰め込み
        for (const iterator of data) {
            chartLabels.push(iterator.language_name)
            chartData.push(iterator.total_posts)
            chartBackGroundColor.push(GRAPH_BACK_COLOR[iterator.language_name].BACKGROUNDCOLOR)
            chartBorderColor.push(GRAPH_BACK_COLOR[iterator.language_name].BORDERCOLOR)
        }
        //返却用オブジェクト生成
        refillMapData.set('labers', chartLabels);
        refillMapData.set('label', labels)
        refillMapData.set('data', chartData);
        refillMapData.set('backgroundColor', chartBackGroundColor);
        refillMapData.set('borderColor', chartBorderColor);
        return refillMapData;
    },
    //GitHubレスポンスデータ、ライブラリ用に変換
    this.responseGitHubDataRefill = function(data, labels) {

        //返却用Map
        let refillMapData = new Map();
        // データ保持配列
        let chartLabels = new Array();
        let chartData = new Array();
        let chartBackGroundColor = new Array();
        let chartBorderColor = new Array();
        
        let self = this;
        data = self.gitHubFixedSort(data)

        //データ詰め込み
        for (const iterator of data) {
            chartLabels.push(iterator.language_name);
            chartData.push(iterator.total_repositories);
            chartBackGroundColor.push(GRAPH_BACK_COLOR[iterator.language_name].BACKGROUNDCOLOR);
            chartBorderColor.push(GRAPH_BACK_COLOR[iterator.language_name].BORDERCOLOR);
        }
        //返却用オブジェクト生成
        refillMapData.set('labers', chartLabels);
        refillMapData.set('label', labels)
        refillMapData.set('data', chartData);
        refillMapData.set('backgroundColor', chartBackGroundColor);
        refillMapData.set('borderColor', chartBorderColor);
        return refillMapData;
    },
    //グラフ生成関数
    this.graphGeneration = function(refillMapData, text) {
        //分割代入
        let [labels, label, data, backgroundColor, borderColor] = [
            refillMapData.get('labers'),
            refillMapData.get('label'),
            refillMapData.get('data'),
            refillMapData.get('backgroundColor'),
            refillMapData.get('borderColor')
        ];
        //グラフ生成
        var ctx = document.getElementById('graph');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{ label, data, backgroundColor, borderColor, borderWidth: 1 }]
            },
            options: {
                scales: {
                    y: {
                    　beginAtZero: true
                    }
                },
                title: {
                display: true,
                text: text,
                fontSize: 20
                }
            }
        });
    },
    //Qiitaランキング表示用オブジェクト生成関数
    this.qiitaRankingDispObjctGeneration = function(resData) {
        //返却用オブジェクト配列
        let rankingDispObj = new Array();

        //テータソート
        let self = this;
        resData = self.qiitaFixedSort(resData);

        //ランキング表示用オブジェクト生成
        let rankAdjCount = 0;
        for(let index = 0; index < resData.length; index++) {
            //各データ詰め替え
            let languageName = resData[index].language_name
            let catchPhrase = resData[index].catch_phrase
            let imgUrl = resData[index].img_url
            let languageId = resData[index].id
            let incremental = resData[index].incremental
            let description = $sce.trustAsHtml(resData[index].description)
            let arrowIconPath =  incremental === 0 ? "none.jpeg" : incremental > 0 ? "up.jpeg" : "down.jpeg"

            let jObj = { languageName, catchPhrase, imgUrl, languageId, incremental, description, arrowIconPath }
            
            // 同順位の場合
            if(index > 0 && resData[index].total_posts === resData[index-1].total_posts) {
                jObj.rank = rankAdjCount > 0 ? index - rankAdjCount : index;
                rankAdjCount++;
            } else {
                jObj.rank = index + 1;
                rankAdjCount = 0;
            }
            // 1 2 3 位の画像
            let rankImg = index === 0 ? 'rank1.png' : index === 1 ? 'rank2.png' : index === 2 ? 'rank3.png' : false;
            if(rankImg) { jObj.rankImg = rankImg };
            rankingDispObj.push(jObj);
        }
        // $log.info('ランキング表示用オブジェクト: ' + JSON.stringify(rankingDispObj));
        return rankingDispObj;

    },
    //GitHubランキング表示用オブジェクト生成関数
    this.gitHubRankingDispObjctGeneration = function(resData) {
        //返却用オブジェクト配列
        let rankingDispObj = new Array();

        let self = this;
        resData = self.gitHubFixedSort(resData);

        //ランキング表示用オブジェクト生成
        let rankAdjCount = 0;
        for(let index = 0; index < resData.length; index++) {

            //各データ詰め替え
            let languageName = resData[index].language_name
            let catchPhrase = resData[index].catch_phrase
            let imgUrl = resData[index].img_url
            let languageId = resData[index].id
            let incremental = resData[index].incremental
            let description = $sce.trustAsHtml(resData[index].description)
            let arrowIconPath =  incremental === 0 ? "none.jpeg" : incremental > 0 ? "up.jpeg" : "down.jpeg"

            let jObj = { languageName, catchPhrase, imgUrl, languageId, incremental, description, arrowIconPath }

            // 同順位の場合
            if(index > 0 && resData[index].total_repositories === resData[index-1].total_repositories) {
                jObj.rank = rankAdjCount > 0 ? index - rankAdjCount : index;
                rankAdjCount++;
            } else {
                jObj.rank = index + 1;
                rankAdjCount = 0;
            }
            // 1 2 3 位の画像
            let rankImg = index === 0 ? 'rank1.png' : index === 1 ? 'rank2.png' : index === 2 ? 'rank3.png' : false;
            if(rankImg) { jObj.rankImg = rankImg };
            rankingDispObj.push(jObj);
        }
        // $log.info('ランキング表示用オブジェクト: ' + JSON.stringify(rankingDispObj));
        return rankingDispObj;

    },
    // ぺジネーション用関数
    this.pagetionFunctionGeneration = function(scope) {
        scope.len = 5;
        scope.start = 0;
        scope.p1 = true;
        scope.pager = function(page) {
            let c = 0;
            while(c <= 3) {
                let classNum = c + 1;
                let model = `p${classNum}`;
                scope[model] = c == page ? true : false;
                c++;
            }
            scope.start = scope.len * page 
        };
    },
    //ページのURLによってタグの色を分ける処理
    this.tagColorCoding = function(scope, location) {
        let path = location.path();
        switch(path) {
            case '/':
            case '/daylyQiita':
                scope.qd = true
                scope.qw = false
                scope.qm = false
                scope.githubBtnOpa = true
                scope.qiitaBtnOpa = false
            break
            case '/weeklyQiita':
                scope.qd = false
                scope.qw = true
                scope.qm = false
                scope.githubBtnOpa = true
                scope.qiitaBtnOpa = false
            break
            case '/monthlyQiita':
                scope.qd = false
                scope.qw = false
                scope.qm = true
                scope.githubBtnOpa = true
                scope.qiitaBtnOpa = false
            break
            case '/github':
            case '/daylyGitHub':
                scope.gd = true
                scope.gw = false
                scope.qm = false
                scope.qiitaBtnOpa = true
                scope.githubBtnOpa = false
            break
            case '/weeklyGitHub':
                scope.gd = false
                scope.gw = true
                scope.qm = false
                scope.qiitaBtnOpa = true
                scope.githubBtnOpa = false
            break
            case '/monthlyGitHub':
                scope.gd = false
                scope.gm = true
                scope.gm = false
                scope.qiitaBtnOpa = true
                scope.githubBtnOpa = false
            break
        }
    },
    //言語詳細ページ URL文字列からidを取得する関数
    this.languageToId = function(languageName) {

        if((TEXTDATA.LANGUAGENAME_LIST).includes(languageName)) {
            $log.info('true')
            let languageId = TEXTDATA.LANGUAGEID_COMPATIBLE_NUMBER[languageName]
            return languageId
        }else {
            // TODO
            $log.info('false')
            return '0'
        }
    },
    //ハンバーガーメニュー生成
    this.generateLanguageDetailNavMenuHtml = function() {

        let html = "";
        TEXTDATA.LANGUAGENAME_LIST.forEach(element => {
            let languageName = element === 'csharp' ? 'C#' : element
            html += `<a class="dropdown-item" href="languageDetails/${element}">${languageName }</a>`
        });
        return $sce.trustAsHtml(html);
    },
    //API値バリデーションチェック
    this.returnValueScrutiny = function(resData, dataType) {
        function check(data) {
            if(data === null || data === "" || data === undefined) {
                return true;
            }else {
                return false
            }
        }
        if(resData.length === 0) {
            return true
        }
        let total = dataType === 'qiita' ? 'total_posts' : 'total_repositories';

        for (const res of resData) {
            if(check(res.id) || check(res.language_name) || check(res.img_url) || check(res.catch_phrase) || check(res.description) || check(res.incremental) || check(res[total])) {
                return true
            }
        }
        return false
    }
}])