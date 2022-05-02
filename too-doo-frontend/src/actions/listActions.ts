export const LOAD_LISTS_FROM_USER_REQUEST = 'LOAD_LISTS_FROM_USER_REQUEST';
export const LOAD_LISTS_FROM_USER_SUCCESS = 'LOAD_LISTS_FROM_USER_SUCCESS';
export const LOAD_LISTS_FROM_USER_FAILURE = 'LOAD_LISTS_FROM_USER_FAILURE';

export const ADD_ITEM_TO_LIST_REQUEST = 'ADD_ITEM_TO_LIST_REQUEST';
export const ADD_ITEM_TO_LIST_SUCCESS = 'ADD_ITEM_TO_LIST_SUCCESS';
export const ADD_ITEM_TO_LIST_FAILURE = 'ADD_ITEM_TO_LIST_FAILURE';

export const ADD_NEW_LIST_REQUEST = 'ADD_NEW_LIST_REQUEST';
export const ADD_NEW_LIST_SUCESS = 'ADD_NEW_LIST_SUCESS';
export const ADD_NEW_LIST_FAILURE = 'ADD_NEW_LIST_FAILURE';



export function requestLoadListsFromUser(userId : string) {
    return { type: LOAD_LISTS_FROM_USER_REQUEST, userId }
}

export function requestAddItemInAList(name: string, listId: string, isComplete: boolean) {
    console.log("HEL")
    return { type: ADD_ITEM_TO_LIST_REQUEST, name, listId, isComplete }
}

export function requestAddNewList(userId: string) {
    return { type: ADD_NEW_LIST_REQUEST, userId }
}