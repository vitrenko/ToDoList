import {useContext} from "react";
import TaskItemContext from "../contexts/TaskItemContext.ts";

const useTaskItem = () => {
  const taskItemContext = useContext(TaskItemContext);

  if (!taskItemContext) {
    throw new Error("useTaskItem has to be used within TaskItemContext provider");
  }

  return taskItemContext;
};

export default useTaskItem;