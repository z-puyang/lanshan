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


