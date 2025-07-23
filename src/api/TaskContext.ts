import {createContext} from "react";

export const TaskContext = createContext([
  {
    isDone: false,
    taskDef: "Clean the floor"
  },
  {
    isDone: false,
    taskDef: "Plan tomorrow"
  },
  {
    isDone: true,
    taskDef: "Cook potato"
  },
]);