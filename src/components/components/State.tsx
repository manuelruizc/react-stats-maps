import React, { useContext } from "react";
import { MapContext } from "./context/MapContext";

const context = MapContext;

interface Props {
  children?: React.ReactNode | null;
  stateCode: string;
  name: string;
  index?: number | null;
}

const State: React.FC<Props> = (props: any) => {
  const onFunctions = useContext(context);
  const { onClickTooltip } = onFunctions;
  const { stateCode, name, index = null } = props;
  return (
    <g
      onClick={
        onClickTooltip !== null
          ? () => onClickTooltip({ stateCode, name, index })
          : () => {}
      }
      id={stateCode}
      data-code={stateCode}
      data-name={name}
      className="svg-map-state"
    >
      {props.children}
    </g>
  );
};

export default State;
