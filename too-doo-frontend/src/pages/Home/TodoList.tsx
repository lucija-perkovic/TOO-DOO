import { Add, Delete } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, List, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { requestAddItemInAList } from "../../actions/listActions";
import { Item } from "../../models/item";
import { ListItem } from "../../models/list";
import { deleteList } from "../../services/BackendService";
import ItemList from "./ItemList";


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

  const handleDelete = () => {
    if(window.confirm(`Are you sure you want to delete ${listItem.listName} list?`)) {
      deleteList(listItem.listId);
    }
  }
  return (
    <Card sx={{ maxWidth: 345, m: 1.25 }} raised>
      <CardHeader
        title={listItem.listName}
        action={
          <IconButton aria-label="list-delete" onClick={handleDelete} color="error">
            <Delete />
          </IconButton>
        }
      />
      <CardContent>
        <Formik initialValues={initialValues} onSubmit={(values: Item, { resetForm }) => {
          dispatch(requestAddItemInAList(values.name, values.listId, values.isComplete));
          resetForm();
        }}>
          {({ values, handleChange, handleSubmit, resetForm }) => (
            <Form onSubmit={handleSubmit}>
              <IconButton size="small" type="submit" color="success">
                <Add/>
              </IconButton>
              <FormControl variant="standard">
                <TextField id="new-item-add" placeholder="Add new item" variant="standard" value={values.name} name="name" onChange={handleChange} />
              </FormControl>
            </Form>
          )}
        </Formik>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
          
          listItem.items?.map((item: Item)=> {
            const labelId = `checkbox-list-label-${item.uuid}`;
            return (
            <ItemList key={item.uuid} item={item} labelId={labelId}/>
            )
          }
          )
            
     
        }
        </List>

      </CardContent>
    </Card>


  );
}

export default TodoList;