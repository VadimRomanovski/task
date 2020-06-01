import { map, setCenterMap } from './js/Mapbox.js';
import { getIpiInfo } from './js/GetIPInfo.js';
import { setLatLng } from './js/SetLatLng.js';
import { setCityCountryName } from './js/SetCityCountryName.js';
import { setBackgroundImge } from './js/SetBackgroundImge.js';
import { chancgeLangInfo } from './js/ChangeLangInfo.js';
import { translate } from './js/Translate.js';
import { setFullWeekDay } from './js/SetFullWeekDay.js';
import { apiRequest } from './js/ApiRequest.js';
import { setWeekDay } from './js/ShortDayWeek.js';
import { setMonth } from './js/SetMonth.js';


let state = {
    curentCity: '',
    langPage: 'en',
    dimensionTemp: 'c',
    timezone: ''
};


const dateTimeContainer = document.querySelector(".data__date-time");    
const weatherTemp = document.querySelector(".weather__temp");
const weatherName = document.querySelector(".weather__name");
const feelsLikeTemp = document.querySelector(".weather__feels-like__temp");
const windValueContainer = document.querySelector(".weather__wind__value");
const humidityValueContainer = document.querySelector(".weather__humidity__value");
const forecastItemsDays = document.querySelectorAll(".forecast__item__day");
const forecastItemsTemp = document.querySelectorAll(".forecast__temp");
const forecastItemsIco = document.querySelectorAll(".forecast__ico");
const weatherImg = document.querySelector(".weather__img");
const header = document.querySelector(".header");
const spinner = document.querySelector(".loader");

const setLocalStorage = (obj) => {
    localStorage.setItem('state', JSON.stringify(obj));
};

const setState = () => {
    if (localStorage.getItem('state')) {
        state = JSON.parse(localStorage.getItem('state'));
      } else {
        state;
      }
};

setState();

const setActiveTempBtn = () => {
    const tempButtons = header.querySelectorAll('.button-temp');
    tempButtons.forEach(btn => {
        btn.classList.remove('button-temp_active');
        if(btn.dataset.temp === state.dimensionTemp){
            btn.classList.add('button-temp_active');
        }
    });
};

const renderDateTimeWeather = () => {
    let date = new Date();
    let option = {timeZone: state.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit'};
    let currentTime = date.toLocaleString('ru', option);
    let currentDay = new Date(date.toLocaleDateString('en', option));
    let weekDay = setWeekDay(state.langPage, currentDay);
    let month = setMonth(state.langPage, currentDay);
    dateTimeContainer.innerHTML = `${weekDay} ${currentDay.getDay()} ${month} ${currentTime}`;
};

const renderWeatherData = (data, dimension) => {
    state.curentCity = data.name;
    let temp = dimension === 'c' ? Math.round(data.main.temp - 273.15) : Math.round((data.main.temp - 273.15) * 9/5 + 32);
    let feelsLike = dimension === 'c' ? Math.round(data.main.feels_like - 273.15) : Math.round((data.main.feels_like - 273.15) * 9/5 + 32);
    let img = new Image();
    img.src = `src/assets/icons/weather-icon/${data.weather[0].icon}.svg`;
    weatherImg.innerHTML = '';
    weatherImg.append(img);
    weatherTemp.innerHTML = `${temp}&deg;`;
    feelsLikeTemp.innerHTML = `${feelsLike} &deg;`;
    humidityValueContainer.innerHTML = `${data.main.humidity} %`;
    windValueContainer.innerHTML = `${data.wind.speed} m/s`;
};

const renderForecastData = (data, dimension) => {
    weatherName.innerHTML = `${data.data[0].weather.description}`;
    let forecastData = data.data.slice(1, 4);
    forecastData.forEach((day, index) => {
        let dateForecast = new Date(day.datetime);
        let weekDayForecast = setFullWeekDay(state.langPage, dateForecast);
        let temp = dimension === 'c' ? Math.round(day.temp - 273.15) : Math.round((day.temp - 273.15) * 9/5 + 32);
        let img = new Image();
        img.src = `src/assets/icons/forecast-icon/${day.weather.icon}.svg`;
        forecastItemsIco[index].innerHTML = '';
        forecastItemsIco[index].append(img);
        forecastItemsDays[index].innerHTML = `${weekDayForecast}`;
        forecastItemsTemp[index].innerHTML = `${temp}&deg;`;
    });
};

const renderGeoData = (data, lang) => {
    let fullLatitude = data.results[0].annotations.DMS.lat;
    let fullLongitude = data.results[0].annotations.DMS.lng;
    state.timezone = data.results[0].annotations.timezone.name;
    setLatLng(fullLatitude, fullLongitude);
    setCenterMap(data.results[0].geometry.lat, data.results[0].geometry.lng);
    if(lang === 'en'){
        setCityCountryName(data.results[0].formatted);
    }else{
        translate(data.results[0].formatted, lang)
        .then(eng => {
            setCityCountryName(...eng.text);
        });
    }  
};

const renderData = (city, lang, dimension) => {
    spinner.classList.remove("hidden-opacity");
    apiRequest(city, lang)
    .then(data => {
        const WEATHER_DATA = data[0];
        const FORECAST_DATA = data[1];
        const GEOCODING_DATA = data[2];
        renderWeatherData(WEATHER_DATA, dimension);
        renderForecastData(FORECAST_DATA, dimension);
        renderGeoData(GEOCODING_DATA, lang);
        setActiveTempBtn();
        chancgeLangInfo(lang);
    })
    .then(() => {
        dateTimeContainer.innerHTML = '';
        setInterval(renderDateTimeWeather, 1000);
        setBackgroundImge(state.timezone, state.curentCity);
        setLocalStorage(state);
        spinner.classList.add("hidden-opacity");
    })
    .catch(err => {
        console.log(err);
    });
};

const startPageApp = () => {
    getIpiInfo()
    .then(data => {
        let clientCity = data.city;
        renderData(clientCity, state.langPage, state.dimensionTemp);
    });
};

// startPageApp();

const searchRequest = () => {
    const input = document.querySelector('.search-block__input');
    let searchText = input.value;
    renderData(searchText, state.langPage, state.dimensionTemp);
};

header.addEventListener('click', (e) => {
    const langButton = e.target.closest('.button-lang');
    const searchButton = e.target.closest('.search-button');
    const changeBgButton = e.target.closest('.change-bg');
    const tempButton = e.target.closest('.button-temp');
    if(searchButton){
        searchRequest();
    }
    if(langButton){
        state.langPage = langButton.dataset.lang;
        renderData(state.curentCity, state.langPage, state.dimensionTemp);
    }
    if(tempButton){
        state.dimensionTemp = tempButton.dataset.temp;
        setActiveTempBtn();
        renderData(state.curentCity, state.langPage, state.dimensionTemp);
    }
    if(changeBgButton){
        setBackgroundImge(state.timezone, state.curentCity);
    }
});

window.addEventListener("keydown", (e) => {
    if(e.code === "Enter"){
        searchRequest();
    }
});

const searchForm = document.querySelector(".search-block");
const searchFormInput = document.querySelector("input");

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if(SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");
  
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  // recognition.lang = "en-US";

  const micBtn = document.querySelector(".microfon-button");

  micBtn.addEventListener("click", micBtnClick);
  function micBtnClick() {
    if(micBtn.classList.contains("microfon-button")) { // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
    }
    else {
      recognition.stop();
    }
  }

  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    micBtn.classList.remove("fa-microphone-alt-slash");
    micBtn.classList.add("fa-microphone-alt");
    searchFormInput.focus();
    console.log("Voice activated, SPEAK");
  }

  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    micBtn.classList.remove("fa-microphone-alt");
    micBtn.classList.add("fa-microphone-alt-slash");
    searchFormInput.focus();
    console.log("Speech recognition service disconnected");
  }

  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    
    if(transcript.toLowerCase().trim()==="stop recording") {
      recognition.stop();
    }
    else if(!searchFormInput.value) {
      searchFormInput.value = transcript;
    }
    else {
      if(transcript.toLowerCase().trim()==="go") {
        searchForm.submit();
      }
      else if(transcript.toLowerCase().trim()==="reset input") {
        searchFormInput.value = "";
      }
      else {
        searchFormInput.value = transcript;
      }
    }
    // searchFormInput.value = transcript;
    // searchFormInput.focus();
    // setTimeout(() => {
    //   searchForm.submit();
    // }, 500);
  }
  
  
  
}
else {
  console.log("Your Browser does not support speech Recognition");
}