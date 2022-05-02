import { Card, CardContent, CardHeader } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Item } from "../../models/item";
import { ListItem } from "../../models/list";
import { getItemsFromList, getList } from "../../services/BackendService";
import { List as ListMUI} from "@mui/material";
import ItemList from "../Home/ItemList";


function List() {
    const href = window.location.pathname;

    const [id, setId] = useState<string>();
    const [list, setList] = useState<ListItem>();
    useEffect(() => {
        setId(href.split("/")[2]);
    }, [id, href])

    useEffect(() => {
        if(id) {
            getList(id).then(resList => {
                getItemsFromList(resList.uuid).then(resItem => {
                    setList({
                        listId: resList.uuid,
                        userId: resList.userId,
                        listName: resList.name,
                        items: resItem
                    });
                })
            })
        }
    }, [id])

  return (
    <Card sx={{ maxWidth: 345, m: 1.25 }} raised>
      <CardHeader
        title={list?.listName}
      />
      <CardContent>
        <ListMUI>
          {

            list?.items?.map((item: Item) => {
              const labelId = `checkbox-list-label-${item.uuid}`;
              return (
                <ItemList key={item.uuid} item={item} labelId={labelId} canEdit={false} />
              )
            }
            )


          }
        </ListMUI>
      </CardContent>
    </Card>
  );
}

export default List;
