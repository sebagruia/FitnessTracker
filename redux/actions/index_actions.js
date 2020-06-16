export const RECEIVE_ENTRIES = "RECEIVE_ENTRIES";
export const ADD_ENTRY = "ADD_ENTRY";

const receiveEntries  = (entries)=>({
    type:RECEIVE_ENTRIES,
    entries
})

const addEntry = (entry) =>({
    type:ADD_ENTRY,
    entry
})

export {receiveEntries, addEntry};