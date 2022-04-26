export const LOAD_LISTS_FROM_USER_REQUEST = 'LOAD_LISTS_FROM_USER_REQUEST';
export const LOAD_LISTS_FROM_USER_SUCCESS = 'LOAD_LISTS_FROM_USER_SUCCESS';
export const LOAD_LISTS_FROM_USER_FAILURE = 'LOAD_LISTS_FROM_USER_FAILURE';


export function requestLoadListsFromUser(userId : string) {
    return { type: LOAD_LISTS_FROM_USER_REQUEST, userId }
}