import { Item } from "../../models/item";
import React, { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { patchAnItem } from "../../services/BackendService";


interface ItemListProps {
  item: Item,
  canEdit: boolean
}

function ItemList({ item, canEdit }: ItemListProps) {
  const [checked, setChecked] = useState<boolean>(item.isComplete);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(canEdit) {
      setChecked(e.target.checked);
      if(item.uuid) {
        patchAnItem(item.uuid, e.target.checked);
      }
    }
  }

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={canEdit ? checked : item.isComplete }
            onChange={handleChange}
          />
        }
        label={item.name}
      />
    </FormGroup>
  )

}

export default ItemList;