import {Box, Button, TextField} from "@mui/material";
import React, {type FormEvent, useState, useContext} from "react";
import TaskListContext from "../contexts/TaskListContext";

export default function ItemAdd() {
  const [value, setValue] = useState("");
  const tasks = useContext(TaskListContext);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const isDuplicate = tasks?.taskList?.some(task => task.taskDef === value) ?? false;

  const handleTaskAdd = ():void => {
    if (tasks?.taskList) {
      const taskArray = [{taskId: Date.now(), isDone: false, taskDef: value}, ...tasks!.taskList];
      tasks!.setTaskList(taskArray);
    } else {
      tasks!.setTaskList([{taskId: Date.now(), isDone: false, taskDef: value}]);
    }

    setValue("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isDuplicate) {
      handleTaskAdd();
    }
  };

  return <div>
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="flex items-center justify-start"
    >
      <TextField
        onChange={handleChange}
        id="outlined-basic"
        label={isDuplicate ? "Error" : "Add your task here"}
        variant="outlined"
        color="primary"
        size="small"
        value={value}
        required
        slotProps={
          {htmlInput: { minLength: 3 }}
        }
        error={isDuplicate}
        helperText={isDuplicate && "This task already exists"}
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