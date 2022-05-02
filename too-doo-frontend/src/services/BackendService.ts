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
    const userData = localStorage.getItem('userData')
    let storedData : any;
    if(userData) {
      storedData = JSON.parse(userData)
    }
    if (config.headers === undefined) {
        config.headers = {};
      }
    else if(storedData) {
        config.headers.Authorization =  `Bearer ${storedData.token}`;
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
    return response.data;
}

export async function getListsFromUser(userId : string) {
    const response = await client.get(`/users/${userId}/lists`);
    return response
}

export async function addItemInAList(name: string, listId: string, isComplete: boolean) {
    const response = await client.post(MainPaths.Items, {
        name: name,
        listId: listId,
        isComplete: isComplete
    });
    return response
}

export async function deleteList(listId : string) {
    const response = await client.delete(`${MainPaths.Lists}/${listId}`);
    return response
}