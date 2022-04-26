import { UserDataRequest } from "../models/user";

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';


export function requestLoginUser(values : UserDataRequest) {
    return { type: LOGIN_USER_REQUEST, values }
}