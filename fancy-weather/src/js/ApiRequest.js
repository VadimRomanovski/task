const apiRequest = (city, lang) => {
    const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=59d5f0d4d134c60ecaced7466aaeaa15`;
    const FORECAST_API = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=4&units=S&lang=${lang}&key=df47fef932494962aef3449d0814e7bf`;
    const GEOCODING_API = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=1b358a8ab5524f758fcd992a7481ffad&pretty=1`;
    const APIS = [WEATHER_API, FORECAST_API, GEOCODING_API];
    let requests = APIS.map(api => fetch(api))
    return Promise.all(requests)
    .then(response => Promise.all(response.map(resp => resp.json())))
};

export { apiRequest }