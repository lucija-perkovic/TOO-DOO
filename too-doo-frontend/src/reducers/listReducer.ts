import { LOAD_LISTS_FROM_USER_SUCCESS } from "../actions/listActions";
import { CustomAction } from "../models/common";
import { ListItem } from "../models/list";


export interface ListItemState {
    lists: ListItem[]
}

const initialState: ListItemState = {
    lists: []
}

function listReducer(state: ListItemState | undefined, action: CustomAction): ListItemState {
    if(typeof state === 'undefined') {
        return initialState;
    }

    switch(action.type) {
        case LOAD_LISTS_FROM_USER_SUCCESS:
            return {
                ...state,
                lists: action.payload
            }
        default:
            return state;
    }
}

export default listReducer;