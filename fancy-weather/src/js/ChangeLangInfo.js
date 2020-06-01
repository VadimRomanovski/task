const chancgeLangInfo = (lang) => {
    const feelsLikeText = document.querySelector(".feels-like-text");
    const windText = document.querySelector(".wind-text");
    const himidityText = document.querySelector(".humdity-text");
    const latitudeText = document.querySelector(".lat-text");
    const longitudeText = document.querySelector(".lng-text");

    if(lang === 'ru'){
        feelsLikeText.innerHTML = `Ощущается как: `;
        windText.innerHTML = `Ветер: `;
        himidityText.innerHTML = `Влжность: `;
        latitudeText.innerHTML = `Широта: `;
        longitudeText.innerHTML = `Долгота: `;
    }else if(lang === 'be'){
        feelsLikeText.innerHTML = `Уяўная тэмпература: `;
        windText.innerHTML = `Хуткасць ветру: `;
        himidityText.innerHTML = `Вільготнасць: `;
        latitudeText.innerHTML = `Шырата: `;
        longitudeText.innerHTML = `Даўгата: `;
    }else if(lang === 'en'){
        feelsLikeText.innerHTML = `Feels like: `;
        windText.innerHTML = `Wind: `;
        himidityText.innerHTML = `Humidity: `;
        latitudeText.innerHTML = `Latitude: `;
        longitudeText.innerHTML = `Longitude: `;
    }
};

export { chancgeLangInfo }