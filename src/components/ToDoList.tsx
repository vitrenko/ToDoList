import {useState, useEffect} from "react";
import type {JSX} from "react";
import ItemAdd from "./ItemAdd";
import Item from "./Item";
import type {Task} from "../api/Task";
import {FormGroup} from "@mui/material";
import TaskListContext from "../contexts/TaskListContext";

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
        key={item.taskId}
        taskId={item.taskId}
        isDone={item.isDone}
        taskDef={item.taskDef}
      />
    );
  };

  return (
    <div className="m-[20px]">
      <div className="shadow-xl/20 rounded-3xl bg-sky-100/70 p-8 w-full sm:w-4/5 md:w-3/5 lg:w-2/5">
        <TaskListContext value={{taskList, setTaskList}}>
          <ItemAdd />
          <FormGroup>
            {showTasks()}
          </FormGroup>
        </TaskListContext>
      </div>
    </div>
  );
}