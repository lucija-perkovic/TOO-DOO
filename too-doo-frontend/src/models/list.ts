import { Item } from "./item";

export interface List {
    uuid: string;
    name: string;
}

export interface ListItem {
    items : Item[]
    listId: string;
    userId: string;
    listName: string;
}