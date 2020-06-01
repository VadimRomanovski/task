const fullDayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const fullRusDayName = ['Воскресене', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const fullBelDayName = ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'];

const setFullWeekDay = (lang, date) => {
    if(lang === 'en'){
       return fullDayName[date.getDay()]; 
    }else if(lang === 'ru'){
       return fullRusDayName[date.getDay()];
    }else if(lang === 'be'){
       return fullBelDayName[date.getDay()];
    }
};

export { setFullWeekDay }