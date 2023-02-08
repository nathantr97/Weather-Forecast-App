// API Key Here

var APIKey= "c6635ef8746ad380fe7694404b48b482";
var geoURL= "http://api.openweathermap.org/data/2.5/weather?q=";
var limit=1;
var lat ="";
var lon ="";

// variable for current date from day.dayjs

var todayDate= dayjs().format("MMM-DD,YYYY");

// variable for search buttons 

var search_btn= $("#search-button");
var searchCity=$("#search-city");

// variables for returned results after users look up their cities

var citySearch=$("city-searched");
var tempSearch=$("#temp");
var windSearch=$("#wind");
var humiditySearch=$("#humidity");

// function for button and also prevent browsers from overriding formats

search_btn.on("click", function (event) {
    event.preventDefault();

var cityName= searchCity[0].value;
if (cityName === "") {
    alert ("city name required! ❌");
    return;
}

// https://openweathermap.org/api/geocoding-api

var geoURL="http://api.openweathermap.org/geo/1.0/direct?q={cityName}&limit={limit}&appid={APIKey}";
fetch(geoURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        lat =data[0].lat;
        lon=data[0].lon;

 // https://openweathermap.org/current (this is for current city that user searched!)

var weathermapURL= "https://api.openweathermap.org/data/2.5/weather?q={cityName}&lat={lat}&lon={lon}&units=imperial&appid={APIKey}";
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
            userWeatherIcon.setAttribute("src", "https://openweather.org/img/w/" + userIcon + ".png");

            citySearch.append(userWeatherIcon);

            // unicode for degree icon https://www.fileformat.info/info/unicode/char/b0/index.htm

            const userTemp = data2.main.temp;
            const usernewTemp=document.createElement("p");
            usernewTemp.textContent=
            "Temperature: " + userTemp + "\u00B0";
            tempSearch.append(usernewTemp);

            const userWind=data2.wind.speed;
            const usernewWind= document.createElement("p");
            usernewWind.textContent="Wind:" + userWind + " MPH";
            windSearch.append(usernewWind);

            const userHumidity=data2.main.humidity+ "%";
            const usernewHumidity=document.createElement("p");
            usernewHumidity.textContent=
            "Humidity: " + userHumidity;
            humiditySearch.append(usernewHumidity);
        })

        // functions and grabbing info for next 5 days forecast go here
        // https://openweathermap.org/forecast5

    var forecastURL="https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=imperial&appid={APIKey}";
    fetch(forecastURL)
    .then(function (response3) {
        return response3.json();
    })
    .then(function (data3)) {
        
    }
