// API Key Here

var APIKey= "c6635ef8746ad380fe7694404b48b482";
var geoURL= "http://api.openweathermap.org/data/2.5/weather?q=";
var limit=1;

// variable for current date from day.dayjs

var todayDate= dayjs().format("MMM-DD,YYYY");

// variable for search buttons 

var search_btn= $("#search-button");
var searchCity=$("#search-city");


var citySearch=$("city-searched");
var tempSearch=$("#temp");
var windSearch=$("#wind");
var humiditySearch=$("#humidity");

search_btn.on("click", function (event) {
    event.preventDefault();

var cityName= searchCity[0].value;
if (cityName === "") {
    alert ("city name required! ❌");
    return;
}

// https://openweathermap.org/api/geocoding-api

var geoURL="http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";


var weather=
// https://openweathermap.org/api/one-call-3

"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}