import { Item } from "../../models/item";
import React from "react";
import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { values } from "lodash";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";


interface ItemListProps {
  item: Item,
  labelId: string
}

function ItemList({ item, labelId }: ItemListProps) {
  const initialValues: Item = {
    name: item.name,
    listId: item.listId,
    isComplete: item.isComplete,
  }
  const dispatch = useDispatch();
  return (
    <Formik initialValues={initialValues} onSubmit={(values: Item, { resetForm }) => {
      resetForm();
    }}>
      {({ values, handleChange, handleSubmit, resetForm }) => (
        <Form onSubmit={handleSubmit}>
          <ListItem
            key={item.uuid}
            disablePadding
          >
            <ListItemButton dense>
              <ListItemIcon role={undefined}>
                <Checkbox
                  edge="start"
                  checked={values.isComplete}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  onChange={handleChange}
                  name="isComplete"
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.name} />
            </ListItemButton>
          </ListItem>
        </Form>
      )}
    </Formik>
  )

}

export default ItemList;