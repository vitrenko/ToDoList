import {Box, Button, TextField} from "@mui/material";
import React, {type FormEvent, useState, useContext} from "react";
import TaskListContext from "../contexts/TaskListContext";

export default function ItemAdd() {
  const [value, setValue] = useState('');
  const tasks = useContext(TaskListContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleTaskAdd = (taskValue: string):void => {
    if (tasks!.taskList) {
      const taskArray = [...tasks!.taskList, {isDone: false, taskDef: taskValue}];
      tasks!.setTaskList(taskArray);
    } else {
      tasks!.setTaskList([{isDone: false, taskDef: taskValue}]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleTaskAdd(value);
    setValue("");
  };

  return <div>
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        onChange={handleChange}
        id="outlined-basic"
        label="Add your task here"
        variant="outlined"
        color="primary"
        size="small"
        value={value}
        required
        slotProps={
          {htmlInput: { minLength: 3 }}
        }
        className="m-1!"
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