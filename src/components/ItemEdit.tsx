import {Box, Button, TextField} from "@mui/material";
import React, {type FormEvent, useState} from "react";

export default function ItemEdit(
  {
    taskDef,
    handleTaskEdit
  }:{
    taskDef: string,
    handleTaskEdit: (oldTaskValue: string, newTaskValue: string) => void
  }) {
  const [value, setValue] = useState(taskDef);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleTaskEdit(taskDef, value);
  }

  return (
    <div>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          size="small"
          variant="filled"
          label="Change task here"
          required
          value={value}
          slotProps={{htmlInput: {minLength: 3}}}
          id="filled-size-small"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Update
        </Button>
      </Box>
    </div>
  );


}