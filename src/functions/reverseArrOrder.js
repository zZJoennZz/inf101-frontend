export function reverseArrOrder(stateArray) {
    let sorted = [];
    for (let i = stateArray.length; i > 0; i--) {
        sorted.push(stateArray[i-1]);
    }

    return sorted;
}