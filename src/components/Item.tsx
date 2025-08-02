import {useState} from "react";
import {FormControlLabel, Checkbox} from "@mui/material";
import {DeleteForeverOutlined, Edit} from "@mui/icons-material";
import type {Task} from "../api/Task.ts";
import ItemEdit from "./ItemEdit.tsx";

interface ItemPropTypes {
  isDone: boolean;
  taskDef: string;
  handleTaskDelete: (taskDef: string) => void;
  handleTaskEdit: (oldTaskDef: string, newTaskDef: string) => void;
}

function Item({ isDone, taskDef, handleTaskDelete, handleTaskEdit }: ItemPropTypes) {
  const [checked, setChecked] = useState(isDone);
  const [isEdit, setIsEdit] = useState(false);

  const handleCheck = (): void => {
    setChecked(!checked);
    const taskArr: Task[] = JSON.parse(localStorage.getItem("tasks")!);
    const updTaskArr = taskArr.map(task => {
      if (task.taskDef == taskDef) {
        task.isDone = !task.isDone;
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updTaskArr));
  };

  const handleEditClick = () => {
    setIsEdit(true);
  };

  if (isEdit) {
    return <ItemEdit taskDef={taskDef} handleTaskEdit={handleTaskEdit} />
  }
  return <div className="flex flex-row items-center">
    <FormControlLabel
      control={<Checkbox onClick={handleCheck} size="large" color="success" checked={checked}/>}
      label={taskDef}
    />
    <Edit
      className="cursor-pointer"
      onClick={handleEditClick}
      color="primary"
      fontSize="medium"
    />
    <DeleteForeverOutlined
      className="cursor-pointer"
      onClick={() => handleTaskDelete(taskDef)}
      color="warning"
      fontSize="medium"/>
  </div>
}

export default Item;