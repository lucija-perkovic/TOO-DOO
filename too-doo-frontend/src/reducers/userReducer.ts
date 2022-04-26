import { LOAD_LISTS_FROM_USER_SUCCESS } from "../actions/listActions";
import { LOGIN_USER_SUCCESS } from "../actions/userActions";
import { CustomAction } from "../models/common";
import { List, ListItem } from "../models/list";
import { UserDataResponse } from "../models/user";


export interface UserDataResponseState {
    token: string,
    userId: string
}

const initialState: UserDataResponseState = {
    token: '',
    userId: ''
}

function listReducer(state: UserDataResponseState | undefined, action: CustomAction): UserDataResponseState {
    if(typeof state === 'undefined') {
        return initialState;
    }

    switch(action.type) {
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId
            }
        default:
            return state;
    }
}

export default listReducer;