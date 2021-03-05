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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var StatMap_1 = __importDefault(require("../../components/StatMap"));
require("./iteration.css");
var Iteration = function () {
    return (jsx_runtime_1.jsx("div", __assign({ className: "iterated-map" }, { children: jsx_runtime_1.jsx(StatMap_1.default, { colors: [
                "rgb(3,155,215)",
                "rgba(3,155,215, 0.7)",
                "rgba(217,28,40,0.7)",
                "rgb(217,28,40)",
            ], stateDefaultColor: "beige", politicalDivision: { width: 1, color: "#222" }, tooltipOnClick: function (data) {
                console.log(data);
            }, usingTooltip: false, onStateHover: function (stateCode) { }, onMouseOut: function (stateCode) { }, svgFile: jsx_runtime_1.jsxs("svg", __assign({ width: "1244", height: "886", viewBox: "0 0 1244 886", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: [jsx_runtime_1.jsx("rect", { id: "blue", "data-name": "blue", x: "834", y: "215", width: "329", height: "263", rx: "131.5", fill: "blue" }, void 0),
                    jsx_runtime_1.jsx("rect", { id: "red", "data-name": "red", x: "276", y: "413", width: "222", height: "262", rx: "111", fill: "red" }, void 0),
                    jsx_runtime_1.jsx("rect", { id: "yellow", "data-name": "yellow", x: "812", y: "529", width: "432", height: "357", fill: "yellow" }, void 0),
                    jsx_runtime_1.jsx("rect", { id: "green", "data-name": "green", width: "541", height: "347", fill: "green" }, void 0)] }), void 0) }, void 0) }), void 0));
};
exports.default = Iteration;
//# sourceMappingURL=Iteration.js.map