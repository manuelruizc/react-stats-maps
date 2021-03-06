import React, { useEffect, useRef, useState } from "react";
import { MapContext } from "./components/context/MapContext";
import MapSVGContainer from "./components/MapSVGContainer";
import State from "./components/State";
import Tooltip from "./components/Tooltip";
import "./statmap.css";

const TOOLTIP_Y_AXIS = 20;

interface StateDataObject {
  code: string;
  name: string;
}
interface Position {
  xAxis: number;
  yAxis: number;
}
interface StatMapProps {
  data: any[];
  customLimitComparative?: object;
  renderCustomTooltip?: any;
  colors?: string[];
  stateDefaultColor?: string;
  limits?: any[];
  politicalDivision?: object;
  usingTooltip?: boolean;
  stateDefaultHoverColor?: string;
  tooltipOnClick?: any;
  defaultTooltipClassName?: string;
  defaultTooltipStyle?: object;
  map?: any;
  onStateHover?: any;
  onMouseOut?: any;
  svgFile?: any;
}

const StatMap: React.FC<StatMapProps> = ({
  data = [],
  customLimitComparative,
  renderCustomTooltip = null,
  colors,
  stateDefaultColor = "white",
  limits = null,
  politicalDivision = { width: 1, color: "#222" },
  usingTooltip = true,
  stateDefaultHoverColor = "blue",
  tooltipOnClick = null,
  defaultTooltipClassName = "",
  defaultTooltipStyle = {},
  map,
  onStateHover = null,
  onMouseOut = null,
  svgFile = null,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [tooltipActive, setTooltipState] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<Position>({
    xAxis: 0,
    yAxis: 0,
  });
  const [
    currentStateData,
    setCurrentStateData,
  ] = useState<StateDataObject | null>(null);
  const [tooltip, setTooltip] = useState(null);
  const [modalPositionUp, setModalPosition] = useState(true);
  const Map = map;

  useEffect(() => {
    if (!data && map) {
      let checkingDefaultLimits;
      if (limits) {
        checkingDefaultLimits = defaultLimitsOrder(limits);
      }
      if (!checkingDefaultLimits) return;
      const gElements = document.getElementsByTagName("g");
      colorStatesWithoutData(
        gElements,
        stateDefaultColor,
        stateDefaultHoverColor,
        politicalDivision
      );
      return;
    }
    if (!data && svgFile) {
      return;
    }
    let colorBy;
    let orderedData: any[] = [];
    const gElements = document.getElementsByTagName("g");
    if (limits) {
      colorBy = limits[0];
      orderedData = orderData(data, colorBy);
    } else {
      limits = [];
    }
    if (customLimitComparative)
      colorStates(
        colors,
        gElements,
        orderedData,
        colorBy,
        limits,
        stateDefaultColor,
        politicalDivision,
        customLimitComparative
      );
    else {
      const checkingDefaultLimits = defaultLimitsOrder(limits);
      if (!checkingDefaultLimits) return;
      colorStates(
        colors,
        gElements,
        orderedData,
        colorBy,
        limits,
        stateDefaultColor,
        politicalDivision
      );
    }
  }, [data, customLimitComparative]);

  const onMouseMove = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    let parentElement = target.parentElement as HTMLElement;
    let grandParentElement = parentElement.parentElement as HTMLElement;
    let containerClientRect: ClientRect;
    const { clientX, clientY } = event;
    let containerExists: boolean = false;
    if (container.current) {
      containerExists = true;
      containerClientRect = container.current.getBoundingClientRect();
      const { left, top } = containerClientRect;
      const xAxis: number = clientX - left;
      const yAxis: number = clientY - top;
      setTooltipPosition({ xAxis, yAxis });
    }
    parentElement = grandParentElement.id ? grandParentElement : parentElement;
    let id: string | null = parentElement.id;
    let dataset = parentElement.dataset ? parentElement.dataset : null;
    if (!dataset) return;
    if (id !== containerId && id.length === 2) {
      const { name = "", code = "" } = dataset;
      const dataObtained = {
        name,
        code,
      };
      setCurrentStateData(dataObtained);
      setTooltipState(true);
      if (containerExists && tooltip) {
        setTooltipOffset(tooltip);
      }
    } else {
      setModalPosition(true);
      setTooltipState(false);
    }
  };

  const onHovering = (event: React.MouseEvent) => {
    const { tagName } = event.target as HTMLElement;
    if (tagName === "svg") return;
    if (!onStateHover) return;
    onStateHover(event);
  };
  const onMouseOuting = (event: React.MouseEvent) => {
    const { tagName } = event.target as HTMLElement;
    if (tagName === "svg") return;
    if (!onMouseOut) return;
    onMouseOut(event);
  };

  const setTooltipOffset = (tooltip: any) => {
    if (!tooltipActive) return;
    const { clientHeight } = tooltip;
    let modalIsUp: boolean = false;
    const { top } = tooltip.getBoundingClientRect();
    if (tooltip.style.transform === `translate(-50%, ${TOOLTIP_Y_AXIS}%)`) {
      const clientHeightUp: number = clientHeight * 1.4;
      modalIsUp = clientHeightUp + TOOLTIP_Y_AXIS < top;
      setModalPosition(modalIsUp);
      return;
    }
    modalIsUp = top < TOOLTIP_Y_AXIS ? false : true;
    setModalPosition(modalIsUp);
  };
  const providerValue = { onClickTooltip: tooltipOnClick };
  const containerId: string = "map-container";
  const isMobile = window.orientation !== undefined;
  if (!map && !svgFile) {
    console.error(
      "You need to pass the vector map as prop.\n<VectorMap ... map={svgMap} />"
    );
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>No map</span>
      </div>
    );
  }
  return (
    <MapContext.Provider value={providerValue}>
      <div
        ref={container}
        onMouseMove={
          usingTooltip
            ? (e) => onMouseMove(e)
            : onHovering
            ? (e) => onHovering(e)
            : () => {}
        }
        onMouseOut={!usingTooltip ? (e) => onMouseOuting(e) : () => {}}
        className={containerId}
        id={containerId}
      >
        {/* {svgFile ? <Map /> : <Map />} */}
        {svgFile ? <SVGIteratedMap svgMap={svgFile} /> : <Map />}
        {usingTooltip && !isMobile && (
          <Tooltip
            tooltipActive={tooltipActive}
            modalPositionUp={modalPositionUp}
            setTooltip={setTooltip}
            data={data}
            stateData={currentStateData}
            position={tooltipPosition}
            showTooltip={setTooltipState}
            renderCustomTooltip={
              renderCustomTooltip
                ? (item: any) => renderCustomTooltip(item)
                : null
            }
            defaultTooltipClassName={defaultTooltipClassName}
            defaultTooltipStyle={defaultTooltipStyle}
          />
        )}
      </div>
    </MapContext.Provider>
  );
};

const SVGIteratedMap = (props: any) => {
  const { svgMap } = props;
  if (!svgMap.type) {
    console.error("The svg file you upload is not valid");
    return <></>;
  }
  if (svgMap.type) {
    if (svgMap.type !== "svg") {
      console.error("The component in prop svgFile is not a SVG element.");
      return <></>;
    }
    if (!svgMap.props) {
      console.error("Your svg is empty");
      return <></>;
    }
    if (svgMap.props) {
      if (!svgMap.props.children) {
        console.error("Your svg is empty");
        return <></>;
      }
    }
  }
  const { children } = svgMap.props;
  return (
    <MapSVGContainer>
      {children.map((chill: any, index: number) => {
        const { id } = chill.props;
        const dataName = chill.props["data-name"]
          ? chill.props["data-name"]
          : "";
        if (!id) {
          console.warn(
            "You need to include an id property to identify an svg map directly child"
          );
        }
        return (
          <State index={index} key={id} name={dataName} stateCode={id}>
            {chill}
          </State>
        );
      })}
    </MapSVGContainer>
  );
};

const defaultLimitsOrder = (customLimits: any[]) => {
  if (customLimits.length !== 3) {
    console.error("Array of limits is incomplete");
    return false;
  }
  const [label, orderBy, limits] = customLimits;

  if (typeof label !== "string") {
    console.error("Label array is not valid, should be a string");
    return false;
  }
  if (typeof orderBy !== "string") {
    console.error("orderBy array is not valid, should be a string");
    return false;
  }
  if (!Array.isArray(limits)) {
    console.error("Limits array is not valid, it should be an array");
    return false;
  }
  if (limits.length === 0) {
    return false;
  }
  if (limits.length === 1) {
    return true;
  }
  for (let i = 0; i < limits.length; i++) {
    const currentLimit = limits[i];
    if (typeof currentLimit !== "number") {
      console.error(
        "Limit on limits array is not a number it is a " + typeof currentLimit
      );
      return false;
    }
    if (i === 0) continue;
    const prevLimit = limits[i - 1];
    if (prevLimit > currentLimit) {
      console.error("Error: limits should be in an ascending order");
      return false;
    }
    if (prevLimit === currentLimit) {
      console.error(
        "Error: limits should be in an ascending order and there should be not repeated numbers"
      );
      return false;
    }
  }
  return true;
};

const colorStatesWithoutData = (
  gElements: HTMLCollectionOf<SVGGElement>,
  color: string,
  hoverColor: string,
  politicalDivision: any // object
) => {
  for (let i = 0; i < gElements.length; i++) {
    const gElement = gElements[i];
    // color stroke of state
    gElement.style.strokeWidth = politicalDivision.width.toString();
    gElement.style.stroke = politicalDivision.color;
    // color fill of state
    gElement.style.fill = color;
  }
};

const colorStates = (
  colors: any,
  gElements: HTMLCollectionOf<SVGGElement>,
  orderedData: any[],
  colorBy: string,
  limits: any[],
  stateDefaultColor: any,
  politicalDivision: any,
  customLimitComparative: any = null
) => {
  if (limits) {
    if (colors.length - 1 === limits[2].length) {
      limits[2].push(Infinity);
    }
  }
  for (let i = 0; i < gElements.length; i++) {
    const gElement = gElements[i];
    const { id } = gElement;
    // get currentStateData
    const filteredData = orderedData.filter(
      (land: any) => land.stateCode === id
    );
    // color stroke of state
    gElement.style.strokeWidth = politicalDivision.width.toString();
    gElement.style.stroke = politicalDivision.color;
    // if doesn't exists currentStateData continue to the next iteration
    if (filteredData.length === 0 || !filteredData) {
      gElement.style.fill = stateDefaultColor;
      continue;
    }
    let colorByValue;
    if (customLimitComparative) {
      colorByValue = customLimitComparative(filteredData[0]);
    } else {
      // if there's not custom comparative function value calculator...
      // obtain object of comparative
      colorByValue = filteredData[0].statistics.filter(
        (item: any) => item.label.toLowerCase() === colorBy.toLowerCase()
      );
      colorByValue = Number(
        colorByValue.map((item: any) => item.value).join("")
      );
    }
    let fillColor = 0;
    const valueLimits = limits[2];
    for (let i = 0; i < valueLimits.length; i++) {
      if (i === valueLimits.length - 1) {
        fillColor = valueLimits.length - 1;
        break;
      }
      const currentItem = valueLimits[i];
      const nextItem = valueLimits[i + 1];
      if (colorByValue <= currentItem && colorByValue < nextItem) {
        fillColor = i;
        break;
      }
    }
    gElement.style.fill = colors[fillColor];
  }
};

const orderData = (array: any[], order: string = "desc"): any[] => {
  let arrayToOrder = [...array];
  for (let i = 0; i < arrayToOrder.length; i++) {
    const currentState = arrayToOrder[i];
    let { statistics } = currentState;
    statistics.sort(compare);
    currentState["statistics"] = [...statistics];
  }
  return arrayToOrder;
};

function compare(a: any, b: any) {
  if (a.value > b.value) {
    return -1;
  }
  if (a.value < b.value) {
    return 1;
  }
  return 0;
}

export default StatMap;
