import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, List, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { requestAddItemInAList } from "../../actions/listActions";
import { Item } from "../../models/item";
import { ListItem } from "../../models/list";
import ItemList from "./ItemList";
import ListDialog from "./ListDialog";


interface TodoListProps {
  listItem: ListItem
}

function TodoList({ listItem }: TodoListProps) {
  const initialValues: Item = {
    name: '',
    isComplete: false,
    listId: listItem.listId
  }
  const dispatch = useDispatch();
  const [listName, setListName] = useState<string>(listItem.listName);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${listItem.listName} list?`)) {
      /* deleteList(listItem.listId); */
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
        <Formik initialValues={initialValues} onSubmit={(values: Item, { resetForm }) => {
          if(values.listId) {
            dispatch(requestAddItemInAList(values.name, values.listId, values.isComplete));
          }
          resetForm();
        }}>
          {({ values, handleChange, handleSubmit, resetForm }) => (
            <Form onSubmit={handleSubmit}>
              <IconButton size="small" type="submit" color="success">
                <Add />
              </IconButton>
              <FormControl variant="standard">
                <TextField id="new-item-add" placeholder="Add new item" variant="standard" value={values.name} name="name" onChange={handleChange} />
              </FormControl>
            </Form>
          )}
        </Formik>
        <List>
          {
            listItem.items?.map((item: Item) => {
              const labelId = `checkbox-list-label-${item.uuid}`;
              return (
                <ItemList key={item.uuid} item={item} labelId={labelId} canEdit={true} />
              )
              }
            )
          }
        </List>
        <CardActions>
          <Button size="small" variant="contained" onClick={handleShare}>Share</Button>
        </CardActions>
      </CardContent>
      <ListDialog open={openEditDialog} handleClose={handleClose} title={"Edit"}/>
    </Card>
  );
}

export default TodoList;