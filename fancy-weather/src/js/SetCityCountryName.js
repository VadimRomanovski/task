const setCityCountryName = (country) => {
    const cityContainer = document.querySelector(".city");
    cityContainer.innerHTML = `${country}`;
};

export { setCityCountryName }