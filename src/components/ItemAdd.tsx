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
      className="flex items-start justify-start"
    >
      <TextField
        onChange={handleChange}
        id="outlined-basic"
        label={isDuplicate ? "Error" : "Add your task here"}
        variant="outlined"
        color="primary"
        value={value}
        required
        slotProps={
          {
            htmlInput: {
              minLength: 3,
            },
            input: {
              style: {
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
              }
            }
          }
        }
        sx={{
          marginRight: "16px",
          marginBottom: isDuplicate ? 0 : "23px",
        }}
        error={isDuplicate}
        helperText={isDuplicate && "This task already exists"}
      />
      <Button
        variant="contained"
        size="large"
        type="submit"
        sx={{
          backgroundColor: "#35689a",
          height: 56,
        }}
      >
        ADD TASK
      </Button>
    </Box>
  </div>
}