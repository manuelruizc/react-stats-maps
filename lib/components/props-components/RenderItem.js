"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var RenderItem = function (_a) {
    var item = _a.item;
    if (!item) {
        return (jsx_runtime_1.jsx("div", { children: jsx_runtime_1.jsx("span", { children: "There's no data" }, void 0) }, void 0));
    }
    var stateCode = item.stateCode, statistics = item.statistics;
    var confirmedCasesIndex = statistics.findIndex(function (stat) { return stat.label.toLowerCase() === "confirmed cases"; });
    var confirmedCases = statistics[confirmedCasesIndex].value;
    var deathsIndex = statistics.findIndex(function (stat) { return stat.label.toLowerCase() === "total deaths"; });
    var deaths = statistics[deathsIndex].value;
    var mortalityRate = (100 / confirmedCases) * deaths;
    return (jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("span", { children: stateCode }, void 0),
            statistics.map(function (statisticsItem) {
                var value = statisticsItem.value, label = statisticsItem.label;
                return (jsx_runtime_1.jsx("div", { children: jsx_runtime_1.jsxs("span", { children: [label, ": ", value] }, void 0) }, label));
            }),
            jsx_runtime_1.jsx("div", { children: jsx_runtime_1.jsxs("span", { children: ["Mortality rate: ", mortalityRate.toFixed(2), "%"] }, void 0) }, void 0)] }, void 0));
};
exports.default = RenderItem;
//# sourceMappingURL=RenderItem.js.map