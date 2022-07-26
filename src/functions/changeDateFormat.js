export const changeDateFormat = (bday) => {
    let mydate = new Date(bday);
    let month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ][mydate.getMonth()];
    return month + " " + mydate.getDate() + ", " + mydate.getFullYear();
}