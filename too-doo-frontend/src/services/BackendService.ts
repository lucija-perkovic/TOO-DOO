import axios from "axios";
import { UserCreateRequest, UserDataRequest } from "../models/user";
import { AuthContext } from "../shared/context/Auth/auth-context";
import { store } from "../store";

const baseURL = "http://localhost:3000";
const client = axios.create({ baseURL });

client.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error)
    }
);
client.interceptors.request.use(function (config) {
    const token = store.getState().user.token;
    if (config.headers === undefined) {
        config.headers = {};
      }
    else {
        config.headers.Authorization =  `Bearer ${token}`;
    }
    return config;
});

enum MainPaths {
    Items = '/items',
    Lists = '/lists',
}

export async function addUser(userCreateData : UserCreateRequest) {
    const response = await client.post("/signup", userCreateData)
    return response;
}


export async function login(userData : UserDataRequest) {
    const response = await client.post("/users/login", userData);
    sessionStorage.setItem('jwtToken', response.data.token);
    console.log(sessionStorage)
    return response.data;
}

export async function getListsFromUser(userId : string) {
    console.log("BACKEND")
    const response = await client.get(`/users/${userId}/lists`);
    return response.data
}