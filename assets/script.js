var cityNameEl = document.querySelector("#city-input");
var bntParentEl = document.querySelector("#search-history-btns");
var searchBtn = document.querySelector(".search-btn");
var currentCityEl = document.querySelector(".current-date")
var currentDateEl = document.querySelector(".current-date")
var currentCnditsContrEl = document.querySelector(".current-conditions")
//get city name to convert to lon lat
var formsubmission = function(event) {
    event.preventDefault();

    var cityName = cityNameEl.value;
    //console.log(cityName);

    if (cityName) {
      getCityCoords(cityName);
      var createBtnEl = document.createElement("button")
      createBtnEl.innerHTML=(cityName);
      createBtnEl.setAttribute("class","history-btn");
      bntParentEl.appendChild(createBtnEl)

      var savenBtn = localStorage.setItem("city",JSON.stringify(cityName));
      //console.log(localStorage.getItem("city"));

    } else {
        alert("Enter a valid City!");
    }     
};

//convert city name to long and lat coordinates
var getCityCoords = function(cityName){

    var coordUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + ",&limit=1&appid=094ac0392f9eb792b651f89871fc381b";
    
    fetch(coordUrl)
    .then (function(response){
        if(response.ok){
            response.json().then(function(data){
               // console.log(data);
                getWeatherData(data[0].lat, data[0].lon)
                cityNameEl.textContent="";
            })
        }else {
            alert("Reenter City name!")
        }
    });

};

//get city weather using long and lat

var getWeatherData = function (lat, lon){
var weahterUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&" + "lon=" + lon + "&per_page=5&appid=094ac0392f9eb792b651f89871fc381b"

fetch(weahterUrl)
.then(function(response){
if(response.ok){
    response.json().then(function(data){
        //console.log(data);
        displayCurrentWeather(data);
    })
}
})
};

// display the data in the DOM
var displayCurrentWeather = function(data){
//display the current consitions
console.log(data)
dataList = data.list

currentCnditsContrEl.innerHTML=" "

for (var i=0; i<dataList.length; i++){
    currentCityEl.innerHTML = (data.city.name);
   var currentDate = data.list[0].dt_txt.split(" ")[0];
   currentDateEl.innerHTML=(data.city.name)+(" ")+(currentDate);
   var currentIcon = data.list[0].weather[0].icon;
   var currentWeatherIconEl= document.createElement("img");
   currentWeatherIconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png");
   currentDateEl.append(currentWeatherIconEl);

   // display the current temp, wind and humidity
   var currentTempEl = document.createElement("h5")
   var currentWindEl = document.createElement("h5")
   var currentHumidityEl = document.createElement("h5")
   var currentTemp = data.list[0].main.temp;
   var currentWind = data.list[0].wind.speed;
   var currentHumidity = data.list[0].main.humidity
   console.log(currentTemp)
   currentTempEl.innerHTML = "Temp:" + currentTemp + "°C";
   currentWindEl.innerHTML = "Wind:" + currentWind + "mph";
   currentHumidityEl.innerHTML = "Humidity:" + currentHumidity + "%";

   currentCnditsContrEl.appendChild(currentTempEl);
   currentCnditsContrEl.appendChild(currentWindEl);
   currentCnditsContrEl.appendChild(currentHumidityEl);

break;
}



// display the next 5 days
}

//display weather info

//reload city search history when clicked

//add event listener to submit button and run getusername
searchBtn.addEventListener("click", formsubmission)

//add eventlistener to reload city from search history