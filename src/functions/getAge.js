export const getAge = (ageParam) => {
    let dob = new Date(ageParam);
    let monthDiff = Date.now() - dob.getTime();
    let ageDt = new Date(monthDiff);
    let year = ageDt.getUTCFullYear();

    return Math.abs(year - 1970);
}