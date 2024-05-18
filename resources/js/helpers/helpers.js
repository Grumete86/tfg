const today = new Date();
const todayDate = today.getDate();
const thisMonth = today.getMonth();
const thisYear = today.getFullYear();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);


const calculateMinutes = ({ hours, minutes }) => hours * 60 + minutes;

const getTotalMinutes = (shifts) => {
    return minutesToInterval(shifts.reduce((accum, shift) => accum + (shiftIsFinished(shift) ? calculateMinutes(shiftDuration(shift)) : 0), 0));
};

const getTotalMinutesInMonth = (shifts) => {
    return minutesToInterval(shifts.reduce((accum, shift) => {
        if (shiftIsFinished(shift) && shiftIsThisMonth(shift)) {
            const duration = shiftDuration(shift);
            return accum + calculateMinutes(duration);
        }
        return accum;
    }, 0));
};

const minutesToInterval = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = Math.trunc(duration % 60);
    return { hours, minutes };
};
const shiftDuration = (shift) => {
    let { start_time, end_time } = shift;
    start_time = new Date(start_time);
    end_time = end_time ? new Date(end_time) : end_time = new Date();


    Math.abs(start_time - end_time);
    const hours = Math.floor(Math.abs(start_time - end_time) / 3600000);
    const minutes = Math.floor(Math.abs(start_time - end_time) / 60000) - (hours * 60);
    return {
        hours: hours || 0,
        minutes: minutes || 0,
        hoursString: hours < 10 ? `0${hours}` : hours,
        minutesString: minutes < 10 ? `0${minutes}` : minutes,
    }

}
const shiftIsFinished = (shift) => {
    return shift.end_time != null;
};
const shiftIsThisMonth = (shift) => {
    const start_time = new Date(shift.start_time);

    return start_time.getMonth() === thisMonth && start_time.getFullYear() === thisYear;
};
const matchesDate = (start_time, end_time, date) => {
    return start_time.getDate() === date.getDate() &&
        start_time.getMonth() === date.getMonth() &&
        start_time.getFullYear() === date.getFullYear() &&
        end_time == null;
};
const isInShift = (worker) => {

    const todayShift = worker.shifts.find(shift => {
        const start_time = new Date(shift.start_time);
        const end_time = shift.end_time ? new Date(shift.end_time) : null;
        return matchesDate(start_time, end_time, today) || matchesDate(start_time, end_time, yesterday);
    });
    return todayShift ? { status: true, shift: todayShift } : { status: false, shift: null };
};

function sortShifts(list) {
    list.sort((a, b) => {
        if (a.start_time < b.start_time) return 1;
        if (a.start_time > b.start_time) return -1;
        return 0;
    })
    return list
}
const printMonth = (date) => {
    const options = {
        year: "numeric",
        month: "long",
    }
    const month = date.getMonth() + 1;
    if (lastMonth == 0 || month != lastMonth) {
        lastMonth = month;
        return date.toLocaleDateString('es-ES', options)
    }
    return '';
}

function getShiftProperties(shift) {
    const start = shift.start_time;
    const end = shift.end_time;
    return {
        start_time: (new Date(start)),
        end_time: end ? (new Date(end)) : null,
        duration: shiftDuration(shift),
        start_time_HHMM: dateToHHMM(new Date(shift.start_time)),
        end_time_HHMM: end ? dateToHHMM(new Date(end)) : '',
    }
}
function dateToHHMM(date) {
    return date.toLocaleTimeString('es-ES', { hour: "2-digit", minute: "2-digit" });
}





export {
    calculateMinutes,
    getTotalMinutes,
    getTotalMinutesInMonth,
    minutesToInterval,
    shiftDuration,
    shiftIsFinished,
    shiftIsThisMonth,
    matchesDate,
    isInShift,
    sortShifts,
    printMonth,
    getShiftProperties,
    dateToHHMM
};
