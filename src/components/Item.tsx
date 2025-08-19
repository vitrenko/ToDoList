import {useState} from "react";
import {FormControlLabel, Checkbox} from "@mui/material";
import {DeleteForeverOutlined, Edit} from "@mui/icons-material";
import type {Task} from "../api/Task";
import ItemEdit from "./ItemEdit.tsx";
import TaskItemContext from "../contexts/TaskItemContext";
import useTaskList from "../hooks/useTaskList.ts";


function Item({ taskId, isDone, taskDef }: Task) {
  const [checked, setChecked] = useState(isDone);
  const [isEdit, setIsEdit] = useState(false);

  const tasks = useTaskList();

  const handleCheck = (): void => {
    setChecked(!checked);
    const taskArr: Task[] = JSON.parse(localStorage.getItem("tasks")!);
    const updTaskArr = taskArr.map(task => {
      if (task.taskId == taskId) {
        task.isDone = !task.isDone;
      }
      return task;
    });

    updTaskArr.sort((firstItem, secondItem) => {
      return (firstItem.isDone === secondItem.isDone) ? 0 : firstItem.isDone ? -1: 1;
    });

    tasks.setTaskList(updTaskArr.reverse());
  };

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleStopEdit = () => {
    setIsEdit(false);
  };

  const handleTaskDelete = (taskId: number) => {
    const updTaskArr = tasks.taskList!.filter(task => task.taskId !== taskId);
    tasks.setTaskList(updTaskArr);
  };

  if (isEdit) {
    return <TaskItemContext value={taskDef}>
      <ItemEdit handleStopEdit={handleStopEdit} />
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
      onClick={() => handleTaskDelete(taskId)}
      color="warning"
      fontSize="medium"/>
  </div>
}

export default Item;