import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { ListItem } from "../../models/list";

interface ListDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
}

function ListDialog({ open, handleClose, title }: ListDialogProps) {
  const initialValues: ListItem = {
    listName: '',
    userId: '',
    items: []
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{title} List</DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={(values: ListItem, { resetForm }) => {
          resetForm();
        }}>
          {({ values, handleChange, handleSubmit, resetForm }) => (
            <Form onSubmit={handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                label="List Name"
                type="text"
                fullWidth
                variant="standard"
                name="listName"
                value={values.listName}
              />
            </Form>)}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained">{title}</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ListDialog;