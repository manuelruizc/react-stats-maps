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
var logo_svg_1 = __importDefault(require("./logo.svg"));
require("./App.css");
function App() {
    return (jsx_runtime_1.jsx("div", __assign({ className: "App" }, { children: jsx_runtime_1.jsxs("header", __assign({ className: "App-header" }, { children: [jsx_runtime_1.jsx("img", { src: logo_svg_1.default, className: "App-logo", alt: "logo" }, void 0),
                jsx_runtime_1.jsxs("p", { children: ["Edit ", jsx_runtime_1.jsx("code", { children: "src/App.tsx" }, void 0), " and save to reload."] }, void 0),
                jsx_runtime_1.jsx("a", __assign({ className: "App-link", href: "https://reactjs.org", target: "_blank", rel: "noopener noreferrer" }, { children: "Learn React" }), void 0)] }), void 0) }), void 0));
}
exports.default = App;
//# sourceMappingURL=App.js.map