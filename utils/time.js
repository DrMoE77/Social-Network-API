//for displaying date with (st, nd, rd or th) depending on the last digit
const theDay = (day) =>{
    //separate the last digit from the generated date
    const lastD = Number(day.toString().split('').pop())

    //if the last digit is 1 - st, if 2 - nd, if 3 - rd or else th 
    if (lastD === 1){return `${day}st`}

    else if (lastD === 2){return `${day}nd`}

    else if (lastD === 3){return `${day}rd`}
    
    else {return `${day}th`}

}

// deciding wether its am or pm
const am_pm = hour => hour <= 12 ? "am": "pm"

// exporting the date for the thought or reaction
module.exports = {
    formateddate: date => {
        const day = date.getDate()
        const hour = date.getHours()
        const min =date.getMinutes()
        const month =date.getMonth()
        const year = new Date(date).getFullYear()
        return `${month} ${theDay(day)},${year} at ${hour%12}:${min} ${am_pm (hour)} `
}}