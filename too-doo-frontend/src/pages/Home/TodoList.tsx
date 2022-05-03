import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, IconButton, InputAdornment, List, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestDeleteList, requestLoadListsFromUser } from "../../actions/listActions";
import { Item } from "../../models/item";
import { ListItem } from "../../models/list";
import { AppState } from "../../reducers";
import { checkIfLoading } from "../../reducers/uiReducer";
import { AuthContext } from "../../shared/context/Auth/auth-context";
import ItemList from "./ItemList";
import ListDialog from "./ListDialog";


interface TodoListProps {
  listItem: ListItem
}

function TodoList({ listItem }: TodoListProps) {
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${listItem.listName} list?`)) {
      if(listItem.listId) {
        dispatch(requestDeleteList(listItem.listId));
        dispatch(requestLoadListsFromUser(auth.userId));
      }
    }
  }
  const handleEdit = () => {
    setOpenEditDialog(true);
  }

  const handleClose = () => {
    setOpenEditDialog(false);
  }

  const handleShare = (e: any) => {
    e.preventDefault()
    const ahref = window.location.href
    navigator.clipboard.writeText(`${ahref}/${listItem.listId}`)
    window.alert("Copied the link to clipboard!")
  }
  return (
    <Card sx={{ maxWidth: 345, m: 1.25 }} raised>
      <CardHeader
        title={listItem.listName}
        action={
          <>
            <IconButton aria-label="list-edit" onClick={handleEdit} color="warning">
              <Edit />
            </IconButton>
            <IconButton aria-label="list-delete" onClick={handleDelete} color="error">
              <Delete />
            </IconButton>
          </>
        }
      />
      <CardContent>
        <List>
          {
            listItem.items?.map((item: Item) => {
              return (
                <ItemList key={item.uuid} item={item} canEdit={true} />
              )
              }
            )
          }
        </List>
        <CardActions>
          <Button size="small" variant="contained" onClick={handleShare}>Share</Button>
        </CardActions>
      </CardContent>
      <ListDialog open={openEditDialog} handleClose={handleClose} title={"Edit"} list={listItem}/>
    </Card>
  );
}

export default TodoList;