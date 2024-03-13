const apiKey = "c45a85d5a3199d924f4b4cd02d783b50";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const latLonUrl = "https://api.openweathermap.org/geo/1.0/direct?limit=1";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

const london = "&lat=51.5073219&lon=-0.1276474";

//checkWeather requires the exact lat/lon. convertCity will fetch the lat lon
// of the city name entered before calling checkWeather
async function checkWeather(lat, lon, local_name){
    const response = await fetch(apiUrl + `&lat=${lat}` + `&lon=${lon}` + `&appid=${apiKey}` + `&local_names=fr`);

        var data = await response.json();
        
        console.log("CHECK WEATHER DATA",data);
    
        document.querySelector(".city").innerHTML = local_name /*data.name*/;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
        //Icon changes according to weather
        if(data.weather[0].main == "Clouds"){
                weatherIcon.src = "images/clouds.png";
        } else
        if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
        } else
        if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png";
        } else
        if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
        } else
        if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
        } 
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

}


//Fetches the lat/lon of the City name entered, then calls checkWeather
//If incorrect name is written, lat and lon will be undefined, so the exception will be caught.
async function convertCity(name){
    try {
        console.log("Name entered: " + name);
        const response = await fetch(latLonUrl + `&q=${name}` + `&appid=${apiKey}`);
        var data = await response.json();
        let lat = data[0].lat;
        let lon = data[0].lon;
        let local_name_fr = data[0].local_names.fr;
        console.log("CHECK CONVERT CITY", data);
        checkWeather(lat, lon, data[0].local_names.fr);
    } catch(e) {
        console.log(e)
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }

}

searchBtn.addEventListener("click",()=>{
    convertCity(searchBox.value);
    //checkWeather(searchBox.value);
})