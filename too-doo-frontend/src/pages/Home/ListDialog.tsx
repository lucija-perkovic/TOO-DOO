import { Add } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormGroup, IconButton, InputAdornment, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { requestAddNewList, requestEditList, requestLoadListsFromUser } from "../../actions/listActions";
import { Item } from "../../models/item";
import { ListItem } from "../../models/list";
import { AuthContext } from "../../shared/context/Auth/auth-context";
import ItemList from "./ItemList";

interface ListDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  list: ListItem;
}

function ListDialog({ open, handleClose, title, list }: ListDialogProps) {
  const initialValues: ListItem = {
    listName: list.listName,
    userId: list.userId,
    items: list.items,
    listId: list.listId
  }
  const [items, setItems] = useState<Item[]>(list.items);
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState<string>('');
  const handleAdd = () => {
    let itemsT : Item[] = [
      ...items,
      {
        name: itemName,
        isComplete: false,
        listId: list.listId,
      }
    ]
    setItems(itemsT);
    setItemName('');
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <Formik initialValues={initialValues} onSubmit={(values: ListItem, { resetForm }) => {
        title === "Add" ? dispatch(requestAddNewList(values, auth.userId, items)) : dispatch(requestEditList(values, items));
        handleClose();
        setItems([]);
        resetForm();
      }}>
        {({ values, handleChange, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <DialogTitle>{title} List</DialogTitle>
            <DialogContent>
              <FormGroup sx={{m:2}}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="List Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  name="listName"
                  value={values.listName}
                  onChange={handleChange}
                />
              </FormGroup>
                <IconButton size="small" color="success" onClick={handleAdd}>
                  <Add />
                </IconButton>
                <TextField
                  id="new-item-add" 
                  placeholder="Add new item" 
                  variant="standard" value={itemName} 
                  name="name"
                  onChange={(e) => setItemName(e.currentTarget.value)}
                />
              {
                items.map(item => {
                  return <ItemList key={item.uuid ? item.uuid : item.name} item={item} canEdit={true} />
                })
              }
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">{title}</Button>
            </DialogActions>
          </Form>)}
      </Formik>
    </Dialog>
  )
}

export default ListDialog;