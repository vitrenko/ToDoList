import {Box, Button, TextField} from "@mui/material";
import React, {type FormEvent, useState} from "react";
import useTaskList from "../hooks/useTaskList.ts";
import useTaskItem from "../hooks/useTaskItem.ts";

export default function ItemEdit({handleStopEdit}: {handleStopEdit: () => void}) {
  const tasks = useTaskList();
  const taskDef = useTaskItem();

  const [value, setValue] = useState(taskDef);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  };

  const handleTaskEdit = (oldTaskValue: string, newTaskValue: string) => {
    const updTaskArr = tasks.taskList!.map((task) => {
      if (task.taskDef === oldTaskValue) {
        task.taskDef = newTaskValue;
      }
      return task;
    });

    tasks.setTaskList(updTaskArr);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const isError = tasks.taskList!.some(task => task.taskDef === value) ?? false;
    setIsDuplicate(isError);

    if (!isError) {
      handleTaskEdit(taskDef, value);
      handleStopEdit();
    }
  }

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          error={isDuplicate}
          onChange={handleChange}
          size="small"
          variant="filled"
          label={isDuplicate ? "Error" : "Change task here"}
          required
          value={value}
          slotProps={{htmlInput: {minLength: 3}}}
          id="filled-size-small"
          helperText={isDuplicate && "This task already exists"}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Update
        </Button>
        <Button
          onClick={handleStopEdit}
          variant="outlined"
          color="error"
        >
          Cancel
        </Button>
      </Box>
    </div>
  );
}