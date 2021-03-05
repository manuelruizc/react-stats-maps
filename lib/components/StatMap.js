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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var MapContext_1 = require("./components/context/MapContext");
var MapSVGContainer_1 = __importDefault(require("./components/MapSVGContainer"));
var State_1 = __importDefault(require("./components/State"));
var Tooltip_1 = __importDefault(require("./components/Tooltip"));
require("./statmap.css");
var TOOLTIP_Y_AXIS = 20;
var StatMap = function (props) {
    var _a = props.data, data = _a === void 0 ? false : _a, customLimitComparative = props.customLimitComparative, _b = props.renderCustomTooltip, renderCustomTooltip = _b === void 0 ? null : _b, colors = props.colors, stateDefaultColor = props.stateDefaultColor, _c = props.limits, limits = _c === void 0 ? null : _c, politicalDivision = props.politicalDivision, _d = props.usingTooltip, usingTooltip = _d === void 0 ? true : _d, _e = props.stateDefaultHoverColor, stateDefaultHoverColor = _e === void 0 ? "blue" : _e, _f = props.tooltipOnClick, tooltipOnClick = _f === void 0 ? null : _f, _g = props.defaultTooltipClassName, defaultTooltipClassName = _g === void 0 ? "" : _g, _h = props.defaultTooltipStyle, defaultTooltipStyle = _h === void 0 ? {} : _h, map = props.map, _j = props.onStateHover, onStateHover = _j === void 0 ? null : _j, _k = props.onMouseOut, onMouseOut = _k === void 0 ? null : _k, _l = props.svgFile, svgFile = _l === void 0 ? null : _l;
    var container = react_1.useRef(null);
    var _m = react_1.useState(false), tooltipActive = _m[0], setTooltipState = _m[1];
    var _o = react_1.useState({
        xAxis: 0,
        yAxis: 0,
    }), tooltipPosition = _o[0], setTooltipPosition = _o[1];
    var _p = react_1.useState(null), currentStateData = _p[0], setCurrentStateData = _p[1];
    var _q = react_1.useState(null), tooltip = _q[0], setTooltip = _q[1];
    var _r = react_1.useState(true), modalPositionUp = _r[0], setModalPosition = _r[1];
    var Map = map;
    react_1.useEffect(function () {
        if (!data && map) {
            var checkingDefaultLimits = defaultLimitsOrder(limits);
            if (!checkingDefaultLimits)
                return;
            var gElements_1 = document.getElementsByTagName("g");
            colorStatesWithoutData(gElements_1, stateDefaultColor, stateDefaultHoverColor, politicalDivision);
            return;
        }
        if (!data && svgFile) {
            return;
        }
        var colorBy;
        var orderedData = [];
        var gElements = document.getElementsByTagName("g");
        if (limits) {
            colorBy = limits[0];
            orderedData = orderData(data, colorBy);
        }
        if (customLimitComparative)
            colorStates(colors, gElements, orderedData, colorBy, limits, stateDefaultColor, politicalDivision, customLimitComparative);
        else {
            var checkingDefaultLimits = defaultLimitsOrder(limits);
            if (!checkingDefaultLimits)
                return;
            colorStates(colors, gElements, orderedData, colorBy, limits, stateDefaultColor, politicalDivision);
        }
    }, [data, customLimitComparative]);
    var getSvgMap = function (svg) {
        console.log(svg);
    };
    var onMouseMove = function (event) {
        var target = event.target;
        var parentElement = target.parentElement;
        var grandParentElement = parentElement.parentElement;
        var containerClientRect;
        var clientX = event.clientX, clientY = event.clientY;
        var containerExists = false;
        if (container.current) {
            containerExists = true;
            containerClientRect = container.current.getBoundingClientRect();
            var left = containerClientRect.left, top_1 = containerClientRect.top;
            var xAxis = clientX - left;
            var yAxis = clientY - top_1;
            setTooltipPosition({ xAxis: xAxis, yAxis: yAxis });
        }
        parentElement = grandParentElement.id ? grandParentElement : parentElement;
        var id = parentElement.id;
        var dataset = parentElement.dataset ? parentElement.dataset : null;
        if (!dataset)
            return;
        if (id !== containerId && id.length === 2) {
            var _a = dataset.name, name_1 = _a === void 0 ? "" : _a, _b = dataset.code, code = _b === void 0 ? "" : _b;
            var dataObtained = {
                name: name_1,
                code: code,
            };
            setCurrentStateData(dataObtained);
            setTooltipState(true);
            if (containerExists && tooltip) {
                setTooltipOffset(tooltip);
            }
        }
        else {
            setModalPosition(true);
            setTooltipState(false);
        }
    };
    var onHovering = function (event) {
        var tagName = event.target.tagName;
        if (tagName === "svg")
            return;
        if (!onStateHover)
            return;
        onStateHover(event);
    };
    var onMouseOuting = function (event) {
        var tagName = event.target.tagName;
        if (tagName === "svg")
            return;
        if (!onMouseOut)
            return;
        onMouseOut(event);
    };
    var setTooltipOffset = function (tooltip) {
        if (!tooltipActive)
            return;
        var clientHeight = tooltip.clientHeight;
        var modalIsUp = false;
        var top = tooltip.getBoundingClientRect().top;
        if (tooltip.style.transform === "translate(-50%, " + TOOLTIP_Y_AXIS + "%)") {
            var clientHeightUp = clientHeight * 1.4;
            modalIsUp = clientHeightUp + TOOLTIP_Y_AXIS < top;
            setModalPosition(modalIsUp);
            return;
        }
        modalIsUp = top < TOOLTIP_Y_AXIS ? false : true;
        setModalPosition(modalIsUp);
    };
    var providerValue = { onClickTooltip: tooltipOnClick };
    var containerId = "map-container";
    var isMobile = window.orientation !== undefined;
    if (!map && !svgFile) {
        console.error("You need to pass the vector map as prop.\n<VectorMap ... map={svgMap} />");
        return (jsx_runtime_1.jsx("div", __assign({ style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            } }, { children: jsx_runtime_1.jsx("span", { children: "No map" }, void 0) }), void 0));
    }
    return (jsx_runtime_1.jsx(MapContext_1.MapContext.Provider, __assign({ value: providerValue }, { children: jsx_runtime_1.jsxs("div", __assign({ ref: container, onMouseMove: usingTooltip
                ? function (e) { return onMouseMove(e); }
                : onHovering
                    ? function (e) { return onHovering(e); }
                    : function () { }, onMouseOut: !usingTooltip ? function (e) { return onMouseOuting(e); } : function () { }, className: containerId, id: containerId }, { children: [svgFile ? jsx_runtime_1.jsx(SVGIteratedMap, { svgMap: svgFile }, void 0) : jsx_runtime_1.jsx(Map, {}, void 0),
                usingTooltip && !isMobile && (jsx_runtime_1.jsx(Tooltip_1.default, { tooltipActive: tooltipActive, modalPositionUp: modalPositionUp, setTooltip: setTooltip, data: props.data, stateData: currentStateData, position: tooltipPosition, showTooltip: setTooltipState, renderCustomTooltip: renderCustomTooltip
                        ? function (item) { return renderCustomTooltip(item); }
                        : null, defaultTooltipClassName: defaultTooltipClassName, defaultTooltipStyle: defaultTooltipStyle }, void 0))] }), void 0) }), void 0));
};
var SVGIteratedMap = function (props) {
    var svgMap = props.svgMap;
    if (!svgMap.type) {
        console.error("The svg file you upload is not valid");
        return jsx_runtime_1.jsx(jsx_runtime_1.Fragment, {}, void 0);
    }
    if (svgMap.type) {
        if (svgMap.type !== "svg") {
            console.error("The component in prop svgFile is not a SVG element.");
            return jsx_runtime_1.jsx(jsx_runtime_1.Fragment, {}, void 0);
        }
        if (!svgMap.props) {
            console.error("Your svg is empty");
            return jsx_runtime_1.jsx(jsx_runtime_1.Fragment, {}, void 0);
        }
        if (svgMap.props) {
            if (!svgMap.props.children) {
                console.error("Your svg is empty");
                return jsx_runtime_1.jsx(jsx_runtime_1.Fragment, {}, void 0);
            }
        }
    }
    var children = svgMap.props.children;
    return (jsx_runtime_1.jsx(MapSVGContainer_1.default, { children: children.map(function (chill, index) {
            var id = chill.props.id;
            var dataName = chill.props["data-name"]
                ? chill.props["data-name"]
                : "";
            if (!id) {
                console.warn("You need to include an id property to identify an svg map directly child");
            }
            return (jsx_runtime_1.jsx(State_1.default, __assign({ index: index, name: dataName, stateCode: id }, { children: chill }), id));
        }) }, void 0));
};
var defaultLimitsOrder = function (customLimits) {
    if (customLimits.length !== 3) {
        console.error("Array of limits is incomplete");
        return false;
    }
    var label = customLimits[0], orderBy = customLimits[1], limits = customLimits[2];
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
    for (var i = 0; i < limits.length; i++) {
        var currentLimit = limits[i];
        if (typeof currentLimit !== "number") {
            console.error("Limit on limits array is not a number it is a " + typeof currentLimit);
            return false;
        }
        if (i === 0)
            continue;
        var prevLimit = limits[i - 1];
        if (prevLimit > currentLimit) {
            console.error("Error: limits should be in an ascending order");
            return false;
        }
        if (prevLimit === currentLimit) {
            console.error("Error: limits should be in an ascending order and there should be not repeated numbers");
            return false;
        }
    }
    return true;
};
var colorStatesWithoutData = function (gElements, color, hoverColor, politicalDivision) {
    for (var i = 0; i < gElements.length; i++) {
        var gElement = gElements[i];
        gElement.style.strokeWidth = politicalDivision.width.toString();
        gElement.style.stroke = politicalDivision.color;
        gElement.style.fill = color;
    }
};
var colorStates = function (colors, gElements, orderedData, colorBy, limits, stateDefaultColor, politicalDivision, customLimitComparative) {
    if (customLimitComparative === void 0) { customLimitComparative = null; }
    if (limits) {
        if (colors.length - 1 === limits[2].length) {
            limits[2].push(Infinity);
        }
    }
    var _loop_1 = function (i) {
        var gElement = gElements[i];
        var id = gElement.id;
        var filteredData = orderedData.filter(function (land) { return land.stateCode === id; });
        gElement.style.strokeWidth = politicalDivision.width.toString();
        gElement.style.stroke = politicalDivision.color;
        if (filteredData.length === 0 || !filteredData) {
            gElement.style.fill = stateDefaultColor;
            return "continue";
        }
        var colorByValue = void 0;
        if (customLimitComparative) {
            colorByValue = customLimitComparative(filteredData[0]);
        }
        else {
            colorByValue = filteredData[0].statistics.filter(function (item) { return item.label.toLowerCase() === colorBy.toLowerCase(); });
            colorByValue = Number(colorByValue.map(function (item) { return item.value; }).join(""));
        }
        var fillColor = 0;
        var valueLimits = limits[2];
        for (var i_1 = 0; i_1 < valueLimits.length; i_1++) {
            if (i_1 === valueLimits.length - 1) {
                fillColor = valueLimits.length - 1;
                break;
            }
            var currentItem = valueLimits[i_1];
            var nextItem = valueLimits[i_1 + 1];
            if (colorByValue <= currentItem && colorByValue < nextItem) {
                fillColor = i_1;
                break;
            }
        }
        gElement.style.fill = colors[fillColor];
    };
    for (var i = 0; i < gElements.length; i++) {
        _loop_1(i);
    }
};
var orderData = function (array, order) {
    if (order === void 0) { order = "desc"; }
    var arrayToOrder = __spreadArray([], array);
    for (var i = 0; i < arrayToOrder.length; i++) {
        var currentState = arrayToOrder[i];
        var statistics = currentState.statistics;
        statistics.sort(compare);
        currentState["statistics"] = __spreadArray([], statistics);
    }
    return arrayToOrder;
};
function compare(a, b) {
    if (a.value > b.value) {
        return -1;
    }
    if (a.value < b.value) {
        return 1;
    }
    return 0;
}
exports.default = StatMap;
//# sourceMappingURL=StatMap.js.map