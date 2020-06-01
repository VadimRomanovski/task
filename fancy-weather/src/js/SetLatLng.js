const setLatLng = (lat, lng) => {
    const latitudeContainer = document.querySelector(".map__lat");
    const longitudeContaier = document.querySelector(".map__lng");
    latitudeContainer.innerHTML = `${lat}`;
    longitudeContaier.innerHTML = `${lng}`;
};

export { setLatLng }