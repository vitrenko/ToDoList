import {createContext} from "react";

const TaskItemContext = createContext<string | null>(null);

export default TaskItemContext;