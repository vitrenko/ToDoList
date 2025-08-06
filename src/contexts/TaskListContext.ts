import React, {createContext} from "react";
import type {Task} from "../api/Task";

interface TaskListState {
  taskList: Task[] | null,
  setTaskList: React.Dispatch<React.SetStateAction<Task[] | null>>,
}

const TaskListContext = createContext<TaskListState | null>(null);

export default TaskListContext;