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
var MapContext_1 = require("./context/MapContext");
var context = MapContext_1.MapContext;
var State = function (props) {
    var onFunctions = react_1.useContext(context);
    var onClickTooltip = onFunctions.onClickTooltip;
    var stateCode = props.stateCode, name = props.name, _a = props.index, index = _a === void 0 ? null : _a;
    return (jsx_runtime_1.jsx("g", __assign({ onClick: onClickTooltip !== null
            ? function () { return onClickTooltip({ stateCode: stateCode, name: name, index: index }); }
            : function () { }, id: stateCode, "data-code": stateCode, "data-name": name, className: "svg-map-state" }, { children: props.children }), void 0));
};
exports.default = State;
//# sourceMappingURL=State.js.map