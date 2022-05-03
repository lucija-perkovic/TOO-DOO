import { Item } from "../models/item";
import { ListItem } from "../models/list";

export const LOAD_LISTS_FROM_USER_REQUEST = 'LOAD_LISTS_FROM_USER_REQUEST';
export const LOAD_LISTS_FROM_USER_SUCCESS = 'LOAD_LISTS_FROM_USER_SUCCESS';
export const LOAD_LISTS_FROM_USER_FAILURE = 'LOAD_LISTS_FROM_USER_FAILURE';

export const ADD_NEW_LIST_REQUEST = 'ADD_NEW_LIST_REQUEST';
export const ADD_NEW_LIST_SUCCESS = 'ADD_NEW_LIST_SUCESS';
export const ADD_NEW_LIST_FAILURE = 'ADD_NEW_LIST_FAILURE';

export const EDIT_LIST_REQUEST = 'EDIT_LIST_REQUEST';
export const EDIT_LIST_SUCCESS = 'EDIT_LIST_SUCESS';
export const EDIT_LIST_FAILURE = 'EDIT_LIST_FAILURE';

export const DELETE_LIST_REQUEST = 'DELETE_LIST_REQUEST';
export const DELETE_LIST_SUCCESS = 'DELETE_LIST_SUCCESS';
export const DELETE_LIST_FAILURE= 'DELETE_LIST_FAILURE';


export function requestLoadListsFromUser(userId : string) {
    return { type: LOAD_LISTS_FROM_USER_REQUEST, userId }
}

export function requestAddNewList(values: ListItem, userId: string, items: Item[]) {
    return { type: ADD_NEW_LIST_REQUEST, values, userId, items }
}

export function requestEditList(values : ListItem, items: Item[]) {
    return { type: EDIT_LIST_REQUEST, values, items }
}

export function requestDeleteList(listId: string) {
    return { type: DELETE_LIST_REQUEST, listId }
}