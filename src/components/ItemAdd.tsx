import {Button, TextField} from "@mui/material";
import React, {useState} from "react";

export default function ItemAdd({ onClick }: { onClick: (taskValue: string) => void }) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return <div>
    <TextField
      onChange={handleChange}
      id="outlined-basic"
      label="Add your task here"
      variant="outlined"
      value={value}
    />
    <Button
      onClick={() => onClick(value)}
      variant="contained"
      color="success"
    >
      ADD TASK
    </Button>
  </div>
}