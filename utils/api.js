import { AsyncStorage } from 'react-native';
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from "./_calendar";

// export async function fetchCalendarResults (){
//     const calendarStorage = await AsyncStorage.getItem(CALENDAR_STORAGE_KEY);
//     const entries = formatCalendarResults(calendarStorage);
//     console.log(entries)
//     return entries;
// }
export function fetchCalendarResults (){
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(results=>formatCalendarResults(results))
}


export function submitEntry ({entry, key}){
    return  AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]:entry
    }))
}

export async function removeEntry (key){
    const jsonValue = await AsyncStorage.getItem(CALENDAR_STORAGE_KEY);
     const data = JSON.parse(jsonValue); 
            data[key] = undefined;
            delete data[key];
           await AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
        
}