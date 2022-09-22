var cityNameEl = document.querySelector("#city-input");
var bntParentEl = document.querySelector("#search-history-btns");
var searchBtn = document.querySelector(".search-btn");
//get city name and convert to lon lat
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

var getCityCoords = function(cityName){

    var coordUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + ",&limit=3&appid=094ac0392f9eb792b651f89871fc381b";
    
  
}
//get city weather

//display weather info

//reload city search history when clicked

//add event listener to submit button and run getusername
searchBtn.addEventListener("click", formsubmission)

//add eventlistener to reload city from search history