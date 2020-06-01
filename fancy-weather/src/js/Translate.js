const translate = (text, lang) => {
    return fetch (`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200507T135750Z.f72d6627f06db82d.dd80c8fe8523992a2e3c2c3b7951a6974161debc&text=${text}&lang=en-${lang}`)
    .then(response => response.json())
};

export { translate }