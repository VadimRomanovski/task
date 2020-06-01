const enMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const rusMonth = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября",  "Декабря"];
const beMonth = ["Студзеня", "Лютага", "Сакавіка", "Красавіка", "Мая", "Чэрвеня", "Ліпеня", "Аўгуста", "Верасня", "Кастрычніка", "Лістапада", "Снежаня"];

const setMonth = (lang, date) => {
    if(lang === 'en'){
       return enMonth[date.getMonth()]; 
    }else if(lang === 'ru'){
       return rusMonth[date.getMonth()];
    }else if(lang === 'be'){
       return beMonth[date.getMonth()];
    }
};

export { setMonth }