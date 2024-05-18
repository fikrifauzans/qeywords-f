
// Helper function to pad a number with zero if it's a single digit
export function padZero(number) {
    return number < 10 ? `0${number}` : number;
}


export function HandleTime(date) {
    // Get hours, minutes, and seconds from the date object
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format the time as HH:mm:ss
    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

    return formattedTime;
}



