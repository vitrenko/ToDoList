import {useState} from "react";
import Checkbox from "@mui/material/Checkbox";

interface ItemPropTypes {
  isDone: boolean;
  taskDef: string;
}

function Item({ isDone, taskDef }: ItemPropTypes) {
    const [checked, setChecked] = useState(isDone);

    const handleCheck = () => {
      setChecked(!checked);
    };

    return (
      <div>
          <Checkbox onClick={handleCheck} size="large" color="success" checked={checked} />
          <span>{taskDef}</span>
      </div>
    );
}

export default Item;