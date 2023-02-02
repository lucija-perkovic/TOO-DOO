import axios from "axios";
import { List } from "lodash";
import { Item } from "../models/item";
import { ListItem } from "../models/list";
import { UserCreateRequest, UserDataRequest } from "../models/user";

const baseURL = "http://localhost:3000";
const client = axios.create({ 
    baseURL : baseURL,
    headers: {'Access-Control-Allow-Origin': '*'}
});
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

export async function addItemsToList(listId: string, items: Item[]) {
    const itemsR : Item[] = [];
    items.forEach(item => {
        if(!item.uuid) {
            itemsR.push({
                name: item.name,
                isComplete: item.isComplete,
                listId: listId
            })
        }
    })
    const response = await client.post(`/lists/${listId}/items`, itemsR);
    return response
}

export async function deleteList(listId : string) {
    const response = await client.delete(`${MainPaths.Lists}/${listId}`);
    return response
}

export async function addNewList(userId: string, listName: string) {
    const response = await client.post(`${MainPaths.Lists}`, {
        userId: userId,
        name: listName
    })
    return response
}

export async function patchAList(listId: string, listName: string) {
    const response = await client.patch(`${MainPaths.Lists}/${listId}`, {
        name: listName
    });
    return response
}

export async function getList(listId: string) {
    const response = await client.get(`${MainPaths.Lists}/${listId}`);
    return response.data
}

export async function patchAnItem(itemId: string, isComplete: boolean) {
    const response = await client.patch(`${MainPaths.Items}/${itemId}`, {
        isComplete: isComplete
    })
    return response
}

export async function getItemsFromList(listId: string) {
    const response = await client.get(`${MainPaths.Lists}/${listId}/items`);
    return response.data
}

