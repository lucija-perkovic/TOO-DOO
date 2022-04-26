import { Item } from "./item";

export interface List {
    uuid: string;
    name: string;
}

export interface ListItem {
    listId: string;
    listName: string;
    items : Item[]
}