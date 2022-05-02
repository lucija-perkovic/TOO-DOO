import { combineReducers } from 'redux';
import listReducer, { ListState } from './listReducer';
import uiReducer, { UiState } from './uiReducer';
import userReducer, { UserDataResponseState } from './userReducer';

export interface AppState {
  lists: ListState
  user: UserDataResponseState
  ui: UiState
}

const createRootReducer = () =>
  combineReducers({
    lists: listReducer,
    user: userReducer,
    ui: uiReducer
  });

export default createRootReducer;
