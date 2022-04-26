import { combineReducers } from 'redux';
import listReducer, { ListItemState } from './listReducer';
import userReducer, { UserDataResponseState } from './userReducer';

export interface AppState {
  lists: ListItemState
  user: UserDataResponseState
}

const createRootReducer = () =>
  combineReducers({
    list: listReducer,
    user: userReducer
  });

export default createRootReducer;
