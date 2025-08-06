import {useContext} from "react";
import TaskListContext from "../contexts/TaskListContext";

const useTaskList = () => {
  const taskListContext = useContext(TaskListContext);

  if (!taskListContext) {
    throw new Error("useTaskList has to be used within TaskListContext provider component");
  }

  return taskListContext;
}

export default useTaskList;
