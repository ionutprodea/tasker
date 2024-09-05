export function CurrentDate () {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) return `0${day}/${month}/${year}`;
    if (month < 10) return `${day}/0${month}/${year}`;
    if (day < 10 && month < 10) return `0${day}/0${month}/${year}`
}

