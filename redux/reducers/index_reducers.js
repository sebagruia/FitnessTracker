import {RECEIVE_ENTRIES, ADD_ENTRY} from "../actions/index_actions";

const initialState = {
}

const entries = (state=initialState, action)=>{
    switch(action.type){
        case RECEIVE_ENTRIES:
            return {
                ...state,
                ...action.payload
            }
        case ADD_ENTRY:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default entries;

