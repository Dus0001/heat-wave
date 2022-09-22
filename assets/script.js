var cityNameEl = document.querySelector("#city-input");
var bntParentEl = document.querySelector("#search-history-btns");
var searchBtn = document.querySelector(".search-btn");
//get city name to convert to lon lat
var formsubmission = function(event) {
    event.preventDefault();

    var cityName = cityNameEl.value;
    console.log(cityName);

    if (cityName) {
      getCityCoords(cityName);
      var createBtnEl = document.createElement("button")
      createBtnEl.innerHTML=(cityName);
      createBtnEl.setAttribute("class","history-btn");
      bntParentEl.appendChild(createBtnEl)

      var savenBtn = localStorage.setItem("city",JSON.stringify(cityName));
      console.log(localStorage.getItem("city"));

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
                console.log(data);
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
var weahterUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&" + "lon=" + lon + "&appid=094ac0392f9eb792b651f89871fc381b"

fetch(weahterUrl)
.then(function(response){
if(response.ok){
    response.json().then(function(data){
        console.log(data);

    })
}
})
};

//display weather info

//reload city search history when clicked

//add event listener to submit button and run getusername
searchBtn.addEventListener("click", formsubmission)

//add eventlistener to reload city from search history