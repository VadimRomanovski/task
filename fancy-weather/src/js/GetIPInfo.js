const getIpiInfo = () => {
    return fetch(`https://ipinfo.io/json?token=21e8a21d977491`)
    .then(response => response.json())
};

export { getIpiInfo }