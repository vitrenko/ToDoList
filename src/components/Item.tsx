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

    const itemIndex = updTaskArr.findIndex(item => item.taskId === taskId);
    if (itemIndex == -1) {
      throw new Error("The task not found!");
    }
    const [removedTask] = updTaskArr.splice(itemIndex, 1);

    if (removedTask.isDone) {
      updTaskArr.push(removedTask);
    } else {
      updTaskArr.unshift(removedTask);
    }

    tasks.setTaskList(updTaskArr);
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

  return <div className="flex flex-row items-center justify-between">
    <FormControlLabel
      control={<Checkbox
        onClick={handleCheck}
        size="large"
        checked={checked}
        sx={{
          "&.Mui-checked": {
            color: "#35689a",
          }
        }}
      />}
      label={taskDef}
    />
    <div className="basis-[52px] grow-0 shrink-0">
      <Edit
        className="cursor-pointer mr-1"
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
  </div>
}

export default Item;