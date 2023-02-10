// API Key Here

var APIKey= "04f65e876b94b78ce8029f96bfab27bd";
var limit=1;
var lat ="";
var lon ="";

// variable for current date from day.dayjs

var todayDate= dayjs().format("MMM-DD,YYYY");

// variable for search buttons 

var search_btn= $("#search-button");
// var searchCity=$("#search-city");

var searchCity= document.getElementById("search-city");

// variables for returned results after users look up their cities

var citySearch=$("city-searched");
var tempSearch=$("temp");
var windSearch=$("wind");
var humiditySearch=$("humidity");

// function for button and also prevent browsers from overriding formats

search_btn.on("click", function (event) {
    event.preventDefault();
console.log("button clicked");

var cityName= searchCity.value;
if (cityName === "") {
    alert ("city name required! ❌");
    return;
}

// https://openweathermap.org/api/geocoding-api

var geoURL="https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=" + limit + "&appid=" + APIKey;
fetch(geoURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data1) {
        console.log(data1);
        var lat=data1[0].lat;
        var lon=data1[0].lon;
        console.log(lat, lon);

 // https://openweathermap.org/current (this is for current city that user searched!)

var weathermapURL= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid=" + APIKey;
fetch(weathermapURL)
        .then(function(response2) {
            return response2.json();
        })
        .then(function (data2) {
            console.log(data2);
            const usercityInput = data2.name;
            const usercitySearch=document.createElement("h2");
            usercitySearch.textContent= usercityInput + " " + todayDate;
            citySearch.append(usercitySearch);

            const userIcon = data2.weather[0].icon;
            const userWeatherIcon= document.createElement("img");
            userWeatherIcon.setAttribute("src", "https://openweather.org/img/wn/" + userIcon + "@2x.png");

            citySearch.append(userWeatherIcon);

            // unicode for degree icon https://www.fileformat.info/info/unicode/char/b0/index.htm

            // temperature
            const userTemp = data2.main.temp;
            const usernewTemp=document.createElement("p");
            usernewTemp.textContent=
            "Temperature: " + userTemp + "\u00B0";
            tempSearch.append(usernewTemp);

            // wind
            const userWind=data2.wind.speed;
            const usernewWind= document.createElement("p");
            usernewWind.textContent="Wind:" + userWind + " MPH";
            windSearch.append(usernewWind);

            // humidity
            const userHumidity=data2.main.humidity+ "%";
            const usernewHumidity=document.createElement("p");
            usernewHumidity.textContent=
            "Humidity: " + userHumidity;
            humiditySearch.append(usernewHumidity);
        });

        // functions and grabbing info for next 5 days forecast go here
        // https://openweathermap.org/forecast5

    var forecastURL="https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + APIKey;
    fetch(forecastURL)
    .then(function (response3) {
        return response3.json();
    })
    .then(function (data3) {
        
        // pulling the class forecast info for 5 days at footer

        var fivedaysForecast = document.querySelectorAll(".forecast");
        var dayArray = [0, 8, 16, 24, 32].map((i) => data3.list[i]);

        //for loop to replace and display the data of 5 day forecast
        // still need to get tested to see if application displays 5 days info correctly

        for (let i = 0; i < dayArray.length; i++) {
            fivedaysForecast[i].textContent = "";

            var newcastDate = new Date();
            newcastDate.setDate(newcastDate.getDate() + (i + 1));
            newcastDate = newcastDate.toLocaleDateString("en-US");

            var fivedates = document.createElement("h2");
            fivedates.textContent = newcastDate;
            fivedaysForecast[i].append(fivedates);

            var forecast5DayIcon = data3.list[0].weather[0].icon;
            var forecastIcon = document.createElement("img");
            forecastIcon.setAttribute(
                "src",
                "http://openweathermap.org/img/wn/" +
                    forecast5DayIcon + "@2x.png"
            );
            fivedaysForecast[i].append(forecastIcon);

            var temp5Day = data3.list[0].main.temp;
            var forecastTemp = document.createElement("p");
            forecastTemp.textContent =
                "Temperature: " + temp5Day + "\u00B0";
            fivedaysForecast[i].append(forecastTemp);

            var wind5Day = data3.list[0].wind.speed;
            var forecastWind = document.createElement("p");
            forecastWind.textContent = "Wind: " + wind5Day + " MPH";
            fivedaysForecast[i].append(forecastWind);

            var humidity5Day = data3.list[0].main.humidity;
            var forecastHumidity = document.createElement("p");
            forecastHumidity.textContent =
                "Humidity: " + humidity5Day;
            fivedaysForecast[i].append(forecastHumidity);
        }
    });
});

});
