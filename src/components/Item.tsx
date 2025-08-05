import {useContext, useState} from "react";
import {FormControlLabel, Checkbox} from "@mui/material";
import {DeleteForeverOutlined, Edit} from "@mui/icons-material";
import type {Task} from "../api/Task";
import ItemEdit from "./ItemEdit.tsx";
import TaskItemContext from "../contexts/TaskItemContext";
import TaskListContext from "../contexts/TaskListContext";

interface ItemPropTypes {
  isDone: boolean;
  taskDef: string;
}

function Item({ isDone, taskDef }: ItemPropTypes) {
  const [checked, setChecked] = useState(isDone);
  const [isEdit, setIsEdit] = useState(false);

  const tasks = useContext(TaskListContext);

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

  const handleTaskDelete = (taskDef: string) => {
    const updTaskArr = tasks!.taskList!.filter(task => task.taskDef !== taskDef);
    tasks!.setTaskList(updTaskArr);
  };

  if (isEdit) {
    return <TaskItemContext value={taskDef}>
      <ItemEdit />
    </TaskItemContext>
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