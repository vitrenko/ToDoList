import {useState, useEffect} from "react";
import type {JSX} from "react";
import ItemAdd from "./ItemAdd.tsx";
import Item from "./Item.tsx";
import type {Task} from "../api/Task.ts";
import {FormGroup} from "@mui/material";
import TaskListContext from "../contexts/TaskListContext.ts";

export default function ToDoList() {
  const tasks: string | null = localStorage.getItem("tasks");

  const [taskList, setTaskList] = useState((): Task[] | null => {
    if (tasks) {
      return JSON.parse(tasks);
    }
    return null;
  });

  useEffect(() => {
    if (taskList !== null) localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const showTasks = (): JSX.Element[] | null => {
    if (!taskList) {
      return null;
    }

    return taskList.map((item: Task) =>
      <Item
        key={item.taskDef}
        isDone={item.isDone}
        taskDef={item.taskDef}
      />
    );
  };

  return (
    <div className="m-[20px]">
      <TaskListContext value={{taskList, setTaskList}}>
        <ItemAdd />
        <FormGroup>
          {showTasks()}
        </FormGroup>
      </TaskListContext>
    </div>
  );
}