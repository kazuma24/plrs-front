angular.module('topPageApp')
.constant('title', '毎日ランキング更新！プログラミング言語ランキングサイト')
.constant('FQDN', {
    DAILY_QIITA_RANK_API: 'https://laravel.fact-cs.com/api/dailyQiitaRank',
    WEEKLY_QIITA_RANK_API: 'https://laravel.fact-cs.com/api/weeklyQiitaRank',
    MONTHLY_QIITA_RANK_API: 'https://laravel.fact-cs.com/api/monthlyQiitaRank',
    DAILY_GITHUB_RANK_API: 'https://laravel.fact-cs.com/api/dailyGithubRank',
    WEEKLY_GITHUB_RANK_API: 'https://laravel.fact-cs.com/api/weeklyGithubRank',
    MONTHLY_GITHUB_RANK_API: 'https://laravel.fact-cs.com/api/monthlyGithubRank',
    LANGUAGE_DETAIL_API: 'https://laravel.fact-cs.com/api/getLanguageDetail',
    RANDOM_AFFILIATE_URL_API: 'https://laravel.fact-cs.com/api/getRandomAffiliateUrl'
})
.constant('TEXTDATA', {
    FROM_YESTERDAY_TO_TODAY: function() {
        //昨日~今日
        let toDay = moment().format('YYYY年MM月DD日');
        let yesterday = moment().subtract(1, 'days').format('YYYY年MM月DD日')
        return yesterday + "~" + toDay;
    },
    FROM_LAST_WEEK_TO_THIS_WEEK: function() {

        //前週の日曜日〜土曜日
        let beforeSanday = moment().subtract(7, 'days').day(0).format('YYYY年MM月DD日');
        let beforeSatuday = moment().subtract(7, 'days').day(6).format('YYYY年MM月DD日');
        return beforeSanday + "~" + beforeSatuday;
    },
    FROM_LAST_MONTH_TO_THIS_MONHT: function() {
        // 前月末
        let endOfLastMonth = moment().add('month', -1).endOf('month').format("YYYY年MM月DD日");
        //　前月初
        let startOfLastMonth = moment().add('month', -1).startOf('month').format("YYYY年MM月DD日");
        return startOfLastMonth + "~" + endOfLastMonth;
    },
    QIITA_GRAPH_TITLE: 'Qiita投稿数',
    GITHUB_GRAPH_TITLE: 'GitHub言語リポジトリ数',
    QIITA_GRAPH_LABEL: '記事投稿数',
    GITHUB_GRAPH_LABEL: 'リポジトリ数',
    NODATA_MESSAGE: '申し訳ございません。グラフ化するデータが不足しているか、データの取得に失敗しました。再度お試しください',
    ERROR_MESSAGE: '申し訳ございません。システムエラーが発生しました。再度お試しください。',
    LANGUAGENAME_LIST: ['C','Java','PHP','Ruby','csharp','JavaScript','C++','Go','Python','Kotlin','Swift','Perl','Scala','R','COBOL','Rust','TypeScript','Objective-C','Dart','Elixir'],
    LANGUAGEID_COMPATIBLE_NUMBER: {
        'C':  1,
        'Java': 2,
        'PHP': 3,
        'Ruby': 4,
        'csharp': 5,
        'JavaScript': 6,
        'C++': 7,
        'Go': 8,
        'Python': 9,
        'Kotlin': 10,
        'Swift': 11,
        'Perl': 12,
        'Scala': 13,
        'R': 14,
        'COBOL': 16,
        'Rust': 17,
        'TypeScript': 18,
        'Objective-C': 20,
        'Dart': 21,
        'Elixir': 22
    }
})
.constant('GRAPH_BACK_COLOR', {
    COBOL: {
        BACKGROUNDCOLOR: 'rgba(255, 99, 132, 0.2)',
        BORDERCOLOR: 'rgba(255, 99, 132, 1)'
    },
    Go: {
        BACKGROUNDCOLOR: 'rgba(54, 162, 235, 0.2)',
        BORDERCOLOR: 'rgba(54, 162, 235, 1)'
    },
    Rust: {
        BACKGROUNDCOLOR: 'rgba(255, 206, 86, 0.2)',
        BORDERCOLOR: 'rgba(255, 206, 86, 1)'
    },
    Dart: {
        BACKGROUNDCOLOR: 'rgba(75, 192, 192, 0.2)',
        BORDERCOLOR: 'rgba(75, 192, 192, 1)'
    },
    Ruby: {
        BACKGROUNDCOLOR: 'rgba(153, 102, 255, 0.2)',
        BORDERCOLOR: 'rgba(153, 102, 255, 1)'
    },
    CoffeeScript: {
        BACKGROUNDCOLOR: 'rgba(255, 99, 132, 0.2)',
        BORDERCOLOR: 'rgba(255, 99, 132, 1)'
    },
    Kotlin: {
        BACKGROUNDCOLOR: 'rgba(54, 162, 235, 0.2)',
        BORDERCOLOR: 'rgba(54, 162, 235, 1)'
    },
    JavaScript: {
        BACKGROUNDCOLOR: 'rgba(255, 206, 86, 0.2)',
        BORDERCOLOR: 'rgba(255, 206, 86, 1)'
    },
    Perl: {
        BACKGROUNDCOLOR: 'rgba(75, 192, 192, 0.2)',
        BORDERCOLOR: 'rgba(75, 192, 192, 1)'
    },
    Python: {
        BACKGROUNDCOLOR: 'rgba(153, 102, 255, 0.2)',
        BORDERCOLOR: 'rgba(153, 102, 255, 1)'
    },
    C: {
        BACKGROUNDCOLOR: 'rgba(255, 99, 132, 0.2)',
        BORDERCOLOR: 'rgba(255, 99, 132, 1)'
    },
    Java: {
        BACKGROUNDCOLOR: 'rgba(54, 162, 235, 0.2)',
        BORDERCOLOR: 'rgba(54, 162, 235, 1)'
    },
    VBA: {
        BACKGROUNDCOLOR: 'rgba(255, 206, 86, 0.2)',
        BORDERCOLOR: 'rgba(255, 206, 86, 1)'
    },
    TypeScript: {
        BACKGROUNDCOLOR: 'rgba(75, 192, 192, 0.2)',
        BORDERCOLOR: 'rgba(75, 192, 192, 1)'
    },
    Swift: {
        BACKGROUNDCOLOR: 'rgba(153, 102, 255, 0.2)',
        BORDERCOLOR: 'rgba(153, 102, 255, 1)'
    },
    R: {
        BACKGROUNDCOLOR: 'rgba(54, 162, 235, 0.2)',
        BORDERCOLOR: 'rgba(54, 162, 235, 1)'
    },
    Scala: {
        BACKGROUNDCOLOR: 'rgba(255, 206, 86, 0.2)',
        BORDERCOLOR: 'rgba(255, 206, 86, 1)'
    },
    DM: {
        BACKGROUNDCOLOR: 'rgba(75, 192, 192, 0.2)',
        BORDERCOLOR: 'rgba(75, 192, 192, 1)'
    },
    Elixir: {
        BACKGROUNDCOLOR: 'rgba(153, 102, 255, 0.2)',
        BORDERCOLOR: 'rgba(153, 102, 255, 1)'
    },
    PHP: {
        BACKGROUNDCOLOR: 'rgba(75, 192, 192, 0.2)',
        BORDERCOLOR: 'rgba(75, 192, 192, 1)'
    },
    Groovy: {
        BACKGROUNDCOLOR: 'rgba(153, 102, 255, 0.2)',
        BORDERCOLOR: 'rgba(153, 102, 255, 1)'
    },
    'Objective-C': {
        BACKGROUNDCOLOR: 'rgba(153, 102, 255, 0.2)',
        BORDERCOLOR: 'rgba(153, 102, 255, 1)'
    },
    'C++': {
        BACKGROUNDCOLOR: 'rgba(75, 192, 192, 0.2)',
        BORDERCOLOR: 'rgba(75, 192, 192, 1)'
    },
    'C#': {
        BACKGROUNDCOLOR: 'rgba(153, 102, 255, 0.2)',
        BORDERCOLOR: 'rgba(153, 102, 255, 1)'
    }
})