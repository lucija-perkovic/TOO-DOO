import { LOAD_LISTS_FROM_USER_SUCCESS } from "../actions/listActions";
import { CustomAction } from "../models/common";
import { ListItem } from "../models/list";


export interface ListState {
    lists: ListItem[]
}

const initialState: ListState = {
    lists: []
}

function listReducer(state: ListState | undefined, action: CustomAction): ListState {
    if(typeof state === 'undefined') {
        return initialState;
    }

    switch(action.type) {
        case LOAD_LISTS_FROM_USER_SUCCESS:  
            console.log(action.payload)       
            return {
                ...state,
                lists: action.payload.lists
            };
        default:
            return state;
    }
}

export default listReducer;