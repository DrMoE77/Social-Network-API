const day = (day) =>{
    const lastD = Number(day.toString().split('').pop())
    if (lastD === 1){
        return `${day}st`
    }
    else if (lastD === 2){
        return `${day}nd`
    }
    else if (lastD === 3){
        return `${day}rd`
    }
    else {
        return `${day}th`
    }
}
// deciding wether its am or pm
const am_pm = hour => hour <= 12 ? "am": "pm"

formateddate => {
    const day = date.getDate()
    const hour = date.getHours()
    const min =date.getMinutes()
    const month =date.getMonth()
    const year = new Date(date).getFullYear()
    return `${month} ${day(day)},${year} at ${hour%12}:${min} ${am_pm (hour)} `
}
module.exports = formateddate