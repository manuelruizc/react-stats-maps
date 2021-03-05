import React, { useEffect, useRef, useState } from "react";

const TOOLTIP_Y_AXIS = 20;

const numberWithCommas = (number: number): string =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
interface Position {
  xAxis: number;
  yAxis: number;
}
interface StateDataObject {
  code: string;
  name: string;
}
interface TooltipProps {
  position: Position;
  stateData: StateDataObject | null;
  showTooltip: any;
  data: any[];
  renderCustomTooltip?: any | null;
  setTooltip: any;
  modalPositionUp: boolean;
  tooltipActive: boolean;
  defaultTooltipClassName: string;
  defaultTooltipStyle: any; // fix interface prop
}

const Tooltip: React.FC<TooltipProps> = ({
  position,
  stateData,
  showTooltip,
  data,
  renderCustomTooltip,
  setTooltip,
  modalPositionUp,
  tooltipActive,
  defaultTooltipClassName,
  defaultTooltipStyle,
}) => {
  const tooltip = useRef<HTMLDivElement | null>(null);
  const [stateStatisticsData, setStatisticsData] = useState<object | null>(
    null
  );
  const [tooltipTranslation, setTooltipTranslation] = useState<string>(
    `translate(50%, -1${TOOLTIP_Y_AXIS}%)`
  );
  const { xAxis, yAxis } = position;
  useEffect(() => {
    if (!data) return;
    const code: string | null = stateData ? stateData.code : null;
    if (!code) return;
    const allData = data.filter((land: any) => land.stateCode === code);
    setStatisticsData(allData[0]);
  }, [stateData, data]);
  useEffect(() => {
    if (tooltip.current) {
      setTooltip(tooltip.current);
    }
  }, [position, setTooltip]);

  useEffect(() => {
    if (modalPositionUp)
      setTooltipTranslation(`translate(-50%, -1${TOOLTIP_Y_AXIS}%)`);
    else setTooltipTranslation(`translate(-50%, ${TOOLTIP_Y_AXIS}%)`);
  }, [modalPositionUp]);

  const currentStatistics: any = stateStatisticsData
    ? stateStatisticsData
    : null;
  let defaultTooltipClassNameString = `tooltip-inner-div${
    modalPositionUp ? " tooltip-top" : ""
  }`;
  defaultTooltipClassNameString =
    defaultTooltipClassNameString + " " + defaultTooltipClassName;
  return (
    <div
      ref={tooltip}
      onMouseEnter={() => {
        showTooltip(false);
      }}
      style={{
        display: tooltipActive ? "flex" : "none",
        top: yAxis + "px",
        left: xAxis + "px",
        transform: tooltipTranslation,
      }}
      className="tooltip"
    >
      {renderCustomTooltip ? (
        currentStatistics ? (
          renderCustomTooltip(currentStatistics)
        ) : (
          renderCustomTooltip(null)
        )
      ) : currentStatistics ? (
        <div
          className={defaultTooltipClassNameString}
          style={defaultTooltipStyle}
        >
          <DefaultData
            defaultTooltipClassName={defaultTooltipClassName}
            defaultTooltipStyle={defaultTooltipStyle}
            stateData={stateData}
            data={currentStatistics}
          />
        </div>
      ) : (
        <div
          className={defaultTooltipClassNameString}
          style={defaultTooltipStyle}
        >
          <span>There's no data</span>
        </div>
      )}
    </div>
  );
};

const DefaultData = (props: any) => {
  const {
    data,
    stateData,
    defaultTooltipClassName,
    defaultTooltipStyle,
  } = props;
  const { stateCode, statistics, label } = data;
  const { name, code } = stateData;
  const totalOfValue = (statistics: any[]) => {
    let sum = 0;
    statistics.forEach((stat) => {
      if (typeof stat.value === "number") sum += stat.value;
    });
    return sum;
  };
  const tooltipClassName = "default-tooltip-header " + defaultTooltipClassName;
  return (
    <>
      <div style={defaultTooltipStyle} className={tooltipClassName}>
        <span className="default-tooltip-title">
          {code} - {name}
        </span>
      </div>
      <div className="default-tooltip-body">
        <div className="default-tooltip-body-header">
          <span>{label}</span>
          <span>%</span>
          <span>Total of label</span>
        </div>
        {statistics.map((item: object, index: number) => {
          return (
            <DefaultStatistics
              total={totalOfValue(statistics)}
              key={index}
              item={item}
            />
          );
        })}
      </div>
    </>
  );
};

const DefaultStatistics = (props: any) => {
  const { item, total } = props;
  const { label, value } = item;
  const percentage = (value: number): string =>
    ((100 / total) * value).toFixed(1);
  return (
    <>
      <div className="default-tooltip-item-data">
        <div className="item-data-container label-container">
          <span className="label">{label}</span>
        </div>
        <div className="item-data-container">
          <span>{percentage(value)} %</span>
        </div>
        <div className="item-data-container">
          <span>{numberWithCommas(value)}</span>
        </div>
      </div>
    </>
  );
};

export default Tooltip;
