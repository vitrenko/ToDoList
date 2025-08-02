import {useState, useEffect} from "react";
import type {JSX} from "react";
import ItemAdd from "./ItemAdd.tsx";
import Item from "./Item.tsx";
import type {Task} from "../api/Task.ts";
import {FormGroup} from "@mui/material";

export default function ToDoList() {
  const tasks: string | null = localStorage.getItem("tasks");

  const [taskList, setTaskList] = useState((): Task[] | null => {
    if (tasks) {
      return JSON.parse(tasks);
    }
    return null;
  });

  const handleTaskAdd = (taskValue: string):void => {
    if (taskList) {
      const taskArray = [...taskList, {isDone: false, taskDef: taskValue}];
      setTaskList(taskArray);
    } else {
      setTaskList([{isDone: false, taskDef: taskValue}]);
    }
  };

  const handleTaskEdit = (oldTaskValue: string, newTaskValue: string) => {
    const updTaskArr = taskList!.map((task) => {
      if (task.taskDef == oldTaskValue) {
        task.taskDef = newTaskValue;
      }
      return task;
    });

    setTaskList(updTaskArr);
  };

  const handleTaskDelete = (taskDef: string) => {
    const updTaskArr = taskList!.filter(task => task.taskDef !== taskDef);
    setTaskList(updTaskArr);
  };

  useEffect(() => {
    if (taskList !== null) localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const showTasks = (): JSX.Element[] | null => {
    if (!taskList) {
      return null;
    }

    return taskList.map((item: Task) => (
        <Item
          key={item.taskDef}
          isDone={item.isDone}
          taskDef={item.taskDef}
          handleTaskDelete={handleTaskDelete}
          handleTaskEdit={handleTaskEdit}
        />
      )
    );
  };

  return (
    <div className="m-[20px]">
      <ItemAdd onSubmit={handleTaskAdd} />
      <FormGroup>
        {showTasks()}
      </FormGroup>
    </div>
  );
}