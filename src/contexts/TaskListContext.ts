import React, { createContext } from "react";
import type {Task} from "../api/Task";

interface contextObj {
  taskList: Task[] | null,
  setTaskList: React.Dispatch<React.SetStateAction<Task[] | null>>,
}

const TaskListContext = createContext<contextObj | null>(null);

export default TaskListContext;