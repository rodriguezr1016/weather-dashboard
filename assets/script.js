var APIKey = "68f238c62ec59c60d975c30f67f55aa0";
var weatherCardDiv= document.querySelector(".weather-cards")
var weatherData= document.querySelector(".weather-data")
var createWeatherCard= (inputValue, weatherCard, index) => {
    if(index === 0){
        
        return` <section class="weatherdata"style="border: solid 1px rgb(53, 52, 52); width: 1008px; margin: 10px 11px 10px; height: 200px; position: absolute; top: 74px; left: 410px;">
                    <h2 id="city-name">City: ${inputValue}</h2>
                    <h2 id="temperature">Temperature:${Math.round(((weatherCard.main.temp-273.15)*9/5)+32)}F</h2>
                    <h2 id="wind-data">Wind: ${weatherCard.wind.speed} M/S</h2>
                    <h2 id="humidity">Humidity: ${weatherCard.main.humidity}%</h2>
                </section>`
                
    } else {
        return `<li class= "card" style="background-color: rgb(53, 52, 52);">
        <h3>(${weatherCard.dt_txt.split(" ")[0]})</h3>
        <img src="https://openweathermap.org/img/wn/${weatherCard.weather[0].icon}@2x.png" alt="weather-icon">
        <h4>Temp: ${Math.round(((weatherCard.main.temp-273.15)*9/5)+32)} F</h4>
        <h4>Wind: ${weatherCard.wind.speed} M/S</h4>
        <h4> Humidity: ${weatherCard.main.humidity}%</h4>
        </li>`;
        
    }
}
        var inputValue= document.getElementById('search-input').value;
        //I want to add the previous searches to a list
        var searchbtnEl= document.querySelector("#searchbtn");
        var gettingWeatherDetails = function(inputValue,lat, lon,){
            var weatherAPIURL= `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&list.temp=impperial&appid=${APIKey}`;
            fetch(weatherAPIURL)
            .then(function (response) {
                return response.json();
            })
            .then(data =>{
                var forecastDays=[];
                var fiveDayForecast= data.list.filter(forecast => {
                    var forecastDate = new Date(forecast.dt_txt).getDate();
                    if(!forecastDays.includes(forecastDate)) {
                        return forecastDays.push(forecastDate);
                    }
                })
                weatherCardDiv.innerHTML="";
                weatherData.innerHTML=""
                
                fiveDayForecast.forEach((weatherCard, index) => {
                    if(index === 0){
                        weatherCardDiv.insertAdjacentHTML("beforeend",createWeatherCard(inputValue,weatherCard, index));
                    }else{
                    weatherCardDiv.insertAdjacentHTML("beforeend",createWeatherCard(inputValue, weatherCard, index));
                    }
                });
                
            });
        }
        // gettingTodaysWeather = function(inputValue, lat, lon){
        //     var newWeatherAPIURL= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;
        //     fetch(newWeatherAPIURL)
        //     .then(function (response) {
        //         return response.json();
        //     })
        //     .then(data =>{
        //         console.log(data);
        //         weatherData.innerHTML="";
        //         todaysWeatherInfo.forEach(todaysWeather=> {
                    
        //             weatherData.insertAdjacentHTML("beforeend",createWeatherData(todaysWeather));
        //         });

        //         });
        // }
        searchbtnEl.addEventListener("click", function(target){
    createlist(); 
    gettingCoordinates();
})
function createlist(){
    var cityNameEl= document.getElementById("city-name");
    var inputValue= document.getElementById('search-input').value;
    cityNameEl.innerHTML=`City: ${inputValue}`;
    var inputEl = document.getElementById("search-input");
    localStorage.setItem('city-name',inputValue);
    var recentSearches= document.getElementById("recent-searches");
    var liEl = document.createElement("li");
    var newButton = document.createElement("button");
    newButton.setAttribute("id", "search-again")
    newButton.addEventListener("click", function(){
        localStorage.setItem("city-name",newButton.textContent);
        
        
        gettingCoordinates();

    })
    newButton.innerHTML = inputValue;
    liEl.appendChild(newButton);
    recentSearches.appendChild(liEl);
    inputEl.value=""
    
}
//getting coordinates
var gettingCoordinates = function(city){
    var cityName = localStorage.getItem("city-name");
    var geocodingAPIURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKey}`
    fetch(geocodingAPIURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        var {name, lat, lon} = data [0];
        gettingWeatherDetails(name, lat, lon);
    });
    
}

