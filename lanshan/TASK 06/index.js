// 曲线
var ctx = "myChart";

var myChart = new Chart(ctx, {
    type: "line",

    data: {
        labels: ["昨天", "今天", "明天", "后天", "周二", "周三", "周四", "周五"],
        datasets: [{
                label: 'min',
                data: [19, 16, 17, 19, 21, 18, 20, 21],
                backgroundColor: [
                    'rgba(255, 255, 255,1)',
                    'rgba(255, 255, 255,1)',
                    'rgba(255, 255, 255,1)',
                    'rgba(255, 255, 255,1)',
                    'rgba(255, 255, 255,1)',
                    'rgba(255, 255, 255,1)'
                ],
                pointBackgroundColor: [
                    'rgba(69, 206, 252, 1)',
                    'rgba(69, 206, 252, 1)',
                    'rgba(69, 206, 252, 1)',
                    'rgba(69, 206, 252, 1)',
                    'rgba(69, 206, 252, 1)',
                    'rgba(69, 206, 252, 1)'
                ],


                borderColor: [
                    'rgba(69, 206, 252, 1)',
                    'rgba(69, 206, 252, 1)',
                    'rgba(69, 206, 252, 1)',
                    'rgba(69, 206, 252, 1)',
                    'rgba(69, 206, 252, 1)',
                    'rgba(69, 206, 252, 1)'
                ],
                borderWidth: 2
            },
            {
                label: 'max',
                data: [32, 29, 33, 35, 31, 33, 34, 34],
                backgroundColor: [
                    'rgba(255, 255, 255,1)',
                    'rgba(255, 255, 255,1)',
                    'rgba(255, 255, 255,1)',
                    'rgba(255, 255, 255,1)',
                    'rgba(255, 255, 255,1)',
                    'rgba(255, 255, 255,1)'
                ],
                pointBackgroundColor: [
                    'rgba(255, 213, 79, 1)',
                    'rgba(255, 213, 79, 1)',
                    'rgba(255, 213, 79, 1)',
                    'rgba(255, 213, 79, 1)',
                    'rgba(255, 213, 79, 1)',
                    'rgba(255, 213, 79, 1)'
                ],


                borderColor: [
                    'rgba(255, 213, 79, 1)',
                    'rgba(255, 213, 79, 1)',
                    'rgba(255, 213, 79, 1)',
                    'rgba(255, 213, 79, 1)',
                    'rgba(255, 213, 79, 1)',
                    'rgba(255, 213, 79, 1)'
                ],
                borderWidth: 2
            }

        ]
    },

    options: {
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    beginAtZero: true
                }
            }]
        }

    }
});

// 搜索城市
var cityName = document.getElementById("city");
var search = document.getElementById("search");

if (search.display == "none") {
    cityName.addEventListener("click", () => {
        search.display = "block";
    })

} else if (search.display == "block") {
    cityname.addEventListener("click", () => {
        search.display = "none";
    })
}

// promise 封装ajax
function request(url) {
    return new Promise((resolve, reject) => {
        var XHR = new XMLHttpRequest();
        XHR.open('GET', url, true);
        XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
                if (XHR.status === 200) {
                    // 请求成功，将服务器返回的数据reslove出去
                    resolve(XHR.responseText);
                } else {
                    // 请求失败，将触发的错误reject出去
                    reject(new Error(XHR.responseText));
                }
            }
        };
        XHR.send();
    });
}

// 现在的天气
request("https://devapi.qweather.com/v7/weather/now?location=101010100&key=4ff2ad7ed26d4520a33b2e1d68679da8").then((res) => {
    var nowWea = JSON.parse(res);
    // console.log(nowWea);
    document.querySelector('#temperature').innerHTML = nowWea.HeWeather6[0].now.temp + "°";
    document.querySelector('#wea').innerHTML = nowWea.HeWeather6[0].now.icon;
    document.querySelector('#addition').innerHTML = nowWea.HeWeather6[0].now.windDir + nowWea.HeWeather6[0].now.windScale;

}).catch((e) => {
    new Error(e);
});



// 逐小时的天气
request("https://devapi.qweather.com/v7/weather/24h?location=101010100&key=4ff2ad7ed26d4520a33b2e1d68679da8").then((res) => {
    var hourlyWea = JSON.parse(res);
    // console.log(hourlyWea);

}).catch((e) => {
    new Error(e);
});



// 未来天气
request("https://devapi.qweather.com/v7/weather/3d?location=101010100&key=4ff2ad7ed26d4520a33b2e1d68679da8").then((res) => {
    var forecastWea = JSON.parse(res);

    // 只有三天的数据
    var b = forecastWea.HeWeather6[0].daily_forecast;

    // 近两天的天气

    (function() {
        document.querySelector("#today .temp").innerHTML = b[0].daily.tempMax + "/" + b[0].daily.tempMin + "°";
        document.querySelector("#tommorrow .temp").innerHTML = b[1].daily.tempMax + "/" + b[1].daily.tempMin + "°";

        document.querySelector("#today .weath").innerHTML = b[0].daily.textDay;
        document.querySelector("#tommorrow .weath").innerHTML = b[1].daily.textDay;
    })();



    // 一周的天气

    // 白天天气状况
    (function() {
        // console.log("aaa");
        var a = document.querySelectorAll('#week #week_list .item .daytime .weat')

        var c = b.concat(b);
        for (let i = 0; i <= 5; i++) {
            a[i].innerHTML = c[i].daily.textDay;
        }
    })();


    // 晚上天气状况
    (function() {
        // console.log("aaa");
        var a = document.querySelectorAll('#week #week_list .item .night .weat')

        var c = b.concat(b);
        for (let i = 0; i <= 5; i++) {
            a[i].innerHTML = c[i].daily.textNight;
        }
    })();

    // 风向
    (function() {
        var a = document.querySelectorAll('#week #week_list .item .wind .w')

        var c = b.concat(b);
        for (let i = 0; i <= 5; i++) {
            a[i].innerHTML = c[i].daily.windDirDay;
            if (c[i].daily.windDirDay == "无持续风向") {
                a[i].innerHTML = "微风";
            }
        }
    })();

    // 风力
    (function() {
        var a = document.querySelectorAll('#week #week_list .item .wind .wi')
        var b = forecastWea.HeWeather6[0].daily.textDay;
        var c = b.concat(b);
        for (let i = 0; i <= 5; i++) {
            a[i].innerHTML = c[i].daily.windScaleDay + "级";
        }
    })();

}).catch((e) => {
    new Error(e);
});








//09.04

/**
 * Created by zsq on 2016/11/13.
 */
//调用jsonp函数请求当前所在城市
/*
jsonp('https://api.map.baidu.com/api?v=2.0&ak=Dv1NMU23dh1sGS9n2tUouDEYY96Dfzh3&s=1&callback=getCity');
window.onload = function() {
    //请求天气车数据
    btn.addEventListener('click', function() {
        jsonp(createUrl()[0]);
        jsonp(createUrl()[1]);
    });
    text.addEventListener('keydown', function(e) {
        if (e.keyCode == 13) {
            jsonp(createUrl()[0]);
            jsonp(createUrl()[1]);
        }
    });
}

function getCity() {
    function city(result) {
        //去掉城市名后的"市"
        var city = result.name.substring(0, result.name.length - 1);
        //请求当前城市的天气数据
        jsonp(createUrl(city)[0]);
        jsonp(createUrl(city)[1]);
    }
    var cityName = new BMap.LocalCity();
    cityName.get(city);
}

// 数据请求函数
function jsonp(url) {
    var script = document.createElement('script');
    script.src = url;
    document.body.insertBefore(script, document.body.firstChild);
    document.body.removeChild(script);
}

//数据请求成功回调函数，用于将获取到的数据放入页面相应位置
function getWeather(response) {
    var oSpan = document.getElementsByClassName('info');
    var data = response.result;
    oSpan[0].innerHTML = data[0].citynm;
    oSpan[1].innerHTML = data[0].days;
    oSpan[2].innerHTML = data[0].week;
    oSpan[3].innerHTML = data[0].weather;
    oSpan[4].innerHTML = data[0].temperature;
    oSpan[5].innerHTML = data[0].winp;
    oSpan[6].innerHTML = data[0].wind;

    var aDiv = document.getElementsByClassName('future_box');
    for (var i = 0; i < aDiv.length; i++) {
        var aSpan = aDiv[i].getElementsByClassName('future_info');
        aSpan[0].innerHTML = data[i + 1].week;
        aSpan[1].innerHTML = data[i + 1].days;
        aSpan[2].innerHTML = data[i + 1].weather;
        aSpan[3].innerHTML = data[i + 1].temperature;
        aSpan[4].innerHTML = data[i + 1].wind;
        aSpan[5].innerHTML = data[i + 1].winp;
    }
    //根据返回数据，替换不同天气图片
    changeImg(response);
}

function getTodayWeather(response) {
    var oSpan = document.getElementsByClassName('info');
    var data = response.results;
    oSpan[7].innerHTML = data[0].pm25;
    oSpan[8].innerHTML = data[0].index[4].zs;
    oSpan[9].innerHTML = data[0].index[1].zs;
    oSpan[10].innerHTML = data[0].index[2].zs;
    oSpan[11].innerHTML = data[0].index[0].zs;
}

//根据获取到的数据更改页面中相应的图片
function changeImg(data) {
    var firstImg = document.getElementsByTagName("img")[0];
    var firstWeatherId = data.result[0].weatid;
    chooseImg(firstWeatherId, firstImg);

    var aImg = document.getElementById('future_container').getElementsByTagName('img');
    for (var j = 0; j < aImg.length; j++) {
        var weatherId = data.result[j + 1].weatid;
        chooseImg(weatherId, aImg[j]);
    }
}

//选择图片
function chooseImg(id, index) {
    switch (id) {
        case '1':
            index.src = 'images/weather_icon/1.png';
            break;
        case '2':
            index.src = 'images/weather_icon/2.png';
            break;
        case '3':
            index.src = 'images/weather_icon/3.png';
            break;
        case '4':
        case '5':
        case '6':
        case '8':
        case '9':
        case '10':
        case '11':
        case '12':
        case '13':
        case '20':
        case '22':
        case '23':
        case '24':
        case '25':
        case '26':
            index.src = 'images/weather_icon/4.png';
            break;
        case '7':
            index.src = 'images/weather_icon/6.png';
            break;
        case '14':
        case '15':
        case '16':
        case '17':
        case '18':
        case '27':
        case '28':
        case '29':
            index.src = 'images/weather_icon/5.png';
            break;
        case '19':
        case '21':
        case '30':
        case '31':
        case '32':
        case '33':
            index.src = 'images/weather_icon/7.png';
            break;
        default:
            index.src = 'images/weather_icon/8.png';
    }
}

//根据城市名创建请求数据及url
function createUrl() {
    var cityName = '';
    if (arguments.length == 0) {
        cityName = document.getElementById('text').value;
    } else {
        cityName = arguments[0];
    }
    var urls = [];
    urls[0] = 'https://sapi.k780.com/?app=weather.future&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json&jsoncallback=getWeather&weaid=' + encodeURI(cityName);
    urls[1] = 'https://api.map.baidu.com/telematics/v3/weather?output=json&ak=FK9mkfdQsloEngodbFl4FeY3&callback=getTodayWeather&location=' + encodeURI(cityName);
    return urls;
}*/