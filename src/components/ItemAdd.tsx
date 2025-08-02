import {Box, Button, TextField} from "@mui/material";
import React, {type FormEvent, useState} from "react";

export default function ItemAdd({ onSubmit }: { onSubmit: (taskValue: string) => void }) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return <div>
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        onChange={handleChange}
        id="outlined-basic"
        label="Add your task here"
        variant="outlined"
        value={value}
        required
        slotProps={
          {htmlInput: { minLength: 3 }}
        }
      />
      <Button
        variant="contained"
        color="success"
        type="submit"
      >
        ADD TASK
      </Button>
    </Box>
  </div>
}