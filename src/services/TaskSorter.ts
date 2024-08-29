import { Task } from "../interfaces/Task";

export function TaskSorter (sortType: string, arr: Task[]) {
    if (sortType === " high-low") return highToLow(arr);
    if (sortType === " low-high") return lowToHigh(arr);
    if (sortType === "date-ascending") return dateAscending(arr);
    if (sortType === "date-descending") return dateDescending(arr);
};

export function highToLow (arr: Task[]) {
    let arrHigh: Task[] = [];
    let arrMedium: Task[] = [];
    let arrLow: Task[] = [];
    // Check importance of each element and add it to it's separate array.
    arr.forEach(element => {
        if (element.importance === "high") arrHigh.push(element);
        if (element.importance === "medium") arrMedium.push(element);
        if (element.importance === "low") arrLow.push(element);
    });
    // Return sorted array, from high importance first to low importance last.
    return arrHigh.concat(arrMedium.concat(arrLow));
};

export function lowToHigh (arr: Task[]) {
    let arrHigh: Task[] = [];
    let arrMedium: Task[] = [];
    let arrLow: Task[] = [];
    // Check importance of each element and add it to it's separate array.
    arr.forEach(element => {
        if (element.importance === "high") arrHigh.push(element);
        if (element.importance === "medium") arrMedium.push(element);
        if (element.importance === "low") arrLow.push(element);
    });
    // Return sorted array, from low importance first to high importance last.
    return arrLow.concat(arrMedium.concat(arrHigh));
};

export function dateDescending (arr: Task[]) {
    return arr.sort((a, b) => {
        // Split the date strings into [day, month, year] and convert to numbers
        const [dayA, monthA, yearA] = a.date.split('/').map(Number);
        const [dayB, monthB, yearB] = b.date.split('/').map(Number);

        // Create date objects for comparison
        const dateA = new Date(yearA, monthA - 1, dayA); 
        const dateB = new Date(yearB, monthB - 1, dayB);

        // Compare the two dates
        return dateA.getTime() - dateB.getTime();
    });
};

export function dateAscending (arr: Task[]) {
    return arr.sort((a, b) => {
        // Split the date strings into [day, month, year] and convert to numbers
        const [dayA, monthA, yearA] = a.date.split('/').map(Number);
        const [dayB, monthB, yearB] = b.date.split('/').map(Number);

        // Create date objects for comparison
        const dateA = new Date(yearA, monthA - 1, dayA); 
        const dateB = new Date(yearB, monthB - 1, dayB);

        // Compare the two dates
        return dateB.getTime() - dateA.getTime();
    });
}