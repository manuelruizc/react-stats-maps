"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var TOOLTIP_Y_AXIS = 20;
var numberWithCommas = function (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
var Tooltip = function (_a) {
    var position = _a.position, stateData = _a.stateData, showTooltip = _a.showTooltip, data = _a.data, renderCustomTooltip = _a.renderCustomTooltip, setTooltip = _a.setTooltip, modalPositionUp = _a.modalPositionUp, tooltipActive = _a.tooltipActive, defaultTooltipClassName = _a.defaultTooltipClassName, defaultTooltipStyle = _a.defaultTooltipStyle;
    var tooltip = react_1.useRef(null);
    var _b = react_1.useState(null), stateStatisticsData = _b[0], setStatisticsData = _b[1];
    var _c = react_1.useState("translate(50%, -1" + TOOLTIP_Y_AXIS + "%)"), tooltipTranslation = _c[0], setTooltipTranslation = _c[1];
    var xAxis = position.xAxis, yAxis = position.yAxis;
    react_1.useEffect(function () {
        if (!data)
            return;
        var code = stateData ? stateData.code : null;
        if (!code)
            return;
        var allData = data.filter(function (land) { return land.stateCode === code; });
        setStatisticsData(allData[0]);
    }, [stateData, data]);
    react_1.useEffect(function () {
        if (tooltip.current) {
            setTooltip(tooltip.current);
        }
    }, [position, setTooltip]);
    react_1.useEffect(function () {
        if (modalPositionUp)
            setTooltipTranslation("translate(-50%, -1" + TOOLTIP_Y_AXIS + "%)");
        else
            setTooltipTranslation("translate(-50%, " + TOOLTIP_Y_AXIS + "%)");
    }, [modalPositionUp]);
    var currentStatistics = stateStatisticsData
        ? stateStatisticsData
        : null;
    var defaultTooltipClassNameString = "tooltip-inner-div" + (modalPositionUp ? " tooltip-top" : "");
    defaultTooltipClassNameString =
        defaultTooltipClassNameString + " " + defaultTooltipClassName;
    return (jsx_runtime_1.jsx("div", __assign({ ref: tooltip, onMouseEnter: function () {
            showTooltip(false);
        }, style: {
            display: tooltipActive ? "flex" : "none",
            top: yAxis + "px",
            left: xAxis + "px",
            transform: tooltipTranslation,
        }, className: "tooltip" }, { children: renderCustomTooltip ? (currentStatistics ? (renderCustomTooltip(currentStatistics)) : (renderCustomTooltip(null))) : currentStatistics ? (jsx_runtime_1.jsx("div", __assign({ className: defaultTooltipClassNameString, style: defaultTooltipStyle }, { children: jsx_runtime_1.jsx(DefaultData, { defaultTooltipClassName: defaultTooltipClassName, defaultTooltipStyle: defaultTooltipStyle, stateData: stateData, data: currentStatistics }, void 0) }), void 0)) : (jsx_runtime_1.jsx("div", __assign({ className: defaultTooltipClassNameString, style: defaultTooltipStyle }, { children: jsx_runtime_1.jsx("span", { children: "There's no data" }, void 0) }), void 0)) }), void 0));
};
var DefaultData = function (props) {
    var data = props.data, stateData = props.stateData, defaultTooltipClassName = props.defaultTooltipClassName, defaultTooltipStyle = props.defaultTooltipStyle;
    var stateCode = data.stateCode, statistics = data.statistics, label = data.label;
    var name = stateData.name, code = stateData.code;
    var totalOfValue = function (statistics) {
        var sum = 0;
        statistics.forEach(function (stat) {
            if (typeof stat.value === "number")
                sum += stat.value;
        });
        return sum;
    };
    var tooltipClassName = "default-tooltip-header " + defaultTooltipClassName;
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsx("div", __assign({ style: defaultTooltipStyle, className: tooltipClassName }, { children: jsx_runtime_1.jsxs("span", __assign({ className: "default-tooltip-title" }, { children: [code, " - ", name] }), void 0) }), void 0),
            jsx_runtime_1.jsxs("div", __assign({ className: "default-tooltip-body" }, { children: [jsx_runtime_1.jsxs("div", __assign({ className: "default-tooltip-body-header" }, { children: [jsx_runtime_1.jsx("span", { children: label }, void 0),
                            jsx_runtime_1.jsx("span", { children: "%" }, void 0),
                            jsx_runtime_1.jsx("span", { children: "Total of label" }, void 0)] }), void 0),
                    statistics.map(function (item, index) {
                        return (jsx_runtime_1.jsx(DefaultStatistics, { total: totalOfValue(statistics), item: item }, index));
                    })] }), void 0)] }, void 0));
};
var DefaultStatistics = function (props) {
    var item = props.item, total = props.total;
    var label = item.label, value = item.value;
    var percentage = function (value) {
        return ((100 / total) * value).toFixed(1);
    };
    return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: jsx_runtime_1.jsxs("div", __assign({ className: "default-tooltip-item-data" }, { children: [jsx_runtime_1.jsx("div", __assign({ className: "item-data-container label-container" }, { children: jsx_runtime_1.jsx("span", __assign({ className: "label" }, { children: label }), void 0) }), void 0),
                jsx_runtime_1.jsx("div", __assign({ className: "item-data-container" }, { children: jsx_runtime_1.jsxs("span", { children: [percentage(value), " %"] }, void 0) }), void 0),
                jsx_runtime_1.jsx("div", __assign({ className: "item-data-container" }, { children: jsx_runtime_1.jsx("span", { children: numberWithCommas(value) }, void 0) }), void 0)] }), void 0) }, void 0));
};
exports.default = Tooltip;
//# sourceMappingURL=Tooltip.js.map