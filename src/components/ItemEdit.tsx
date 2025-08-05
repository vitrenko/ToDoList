import {Box, Button, TextField} from "@mui/material";
import React, {type FormEvent, useState, useContext} from "react";
import TaskItemContext from "../contexts/TaskItemContext.ts";
import TaskListContext from "../contexts/TaskListContext.ts";

export default function ItemEdit() {
  const tasks = useContext(TaskListContext);
  const taskDef = useContext(TaskItemContext);

  const [value, setValue] = useState(taskDef);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  };

  const handleTaskEdit = (oldTaskValue: string, newTaskValue: string) => {
    const updTaskArr = tasks!.taskList!.map((task) => {
      if (task.taskDef == oldTaskValue) {
        task.taskDef = newTaskValue;
      }
      return task;
    });

    tasks!.setTaskList(updTaskArr);
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