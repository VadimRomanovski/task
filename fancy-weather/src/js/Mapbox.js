mapboxgl.accessToken = 'pk.eyJ1IjoidmFkaW1yb21hbm92c2tpIiwiYSI6ImNrYW52bWE3eTFpMW4yenA2M2I2OWpvM3oifQ.UOpNHrPbUwmdoG5PnuyV5Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 9
});
 
const setCenterMap = (lt, ln) => {
    map.flyTo({
        center: [ln, lt],
        essential: true 
    });
};

export { map, setCenterMap }