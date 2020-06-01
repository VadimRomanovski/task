const getBackgroundImage = (time, city) => {
    console.log(`Параметры запроса для Unsplash: "${city} ${time} summer"`);
    return fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${city}%${time}%summer&client_id=eTqsae5HxLE4fvTN9fux0u3AryOoMnfvq_Ug6wDyZY8`)
    .then(response => response.json())
};

const setBackgroundImge = (timezone, city) => {
    let date = new Date();
    const appWrapper = document.querySelector(".app-wrapper");
    let option = {timeZone: timezone, hour: '2-digit', minute: '2-digit'};
    let time = date.toLocaleString('en', option);
    getBackgroundImage(time, city)
    .then(data => {
        appWrapper.style.backgroundImage = `url(${data.urls.full})`;
    })
    .catch(() => {  
        if(time.includes("PM")){
            appWrapper.style.backgroundImage = `url(./src/assets/background/morning-sun.jfif)`;
        }else{
            appWrapper.style.backgroundImage = `url(./src/assets/background/night-sun.jfif)`;
        }
        
    });
};

export { setBackgroundImge }