const dayName = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
const rusDayName = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const belDayName = ['Няд', 'Пн', 'Аўт', 'Се', 'Чц', 'Пт', 'Сб'];

const setWeekDay = (lang, date) => {
    if(lang === 'en'){
       return dayName[date.getDay()]; 
    }else if(lang === 'ru'){
       return rusDayName[date.getDay()];
    }else if(lang === 'be'){
       return belDayName[date.getDay()];
    }
};

export { setWeekDay }