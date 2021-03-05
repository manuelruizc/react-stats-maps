"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var USMap_1 = __importDefault(require("../../components/components/USMap"));
var StatMap_1 = __importDefault(require("../../components/StatMap"));
var data_1 = __importDefault(require("./data"));
var Tooltip_1 = __importDefault(require("./Tooltip"));
var USElectionsMaps = function () {
    var politicalDivision = { width: 1, color: "#222" };
    return (jsx_runtime_1.jsx(StatMap_1.default, { colors: [
            "rgb(3,155,215)",
            "rgba(3,155,215, 0.7)",
            "rgba(217,28,40,0.7)",
            "rgb(217,28,40)",
        ], stateDefaultColor: "beige", politicalDivision: politicalDivision, renderCustomTooltip: function (item) {
            return jsx_runtime_1.jsx(Tooltip_1.default, { item: item }, void 0);
        }, limits: ["Active Cases", "desc", [0, 25, 50, 75]], defaultTooltipClassName: "election-tooltip", defaultTooltipStyle: {}, customLimitComparative: function (data) {
            var stateCode = data.stateCode, statistics = data.statistics, totalVotes = data.totalVotes;
            var maxPercentage = 0;
            var maxPercentageParty = "";
            for (var i = 0; i < statistics.length; i++) {
                var stat = statistics[i];
                var percentage = (100 / totalVotes) * stat.votes;
                if (i === 0) {
                    maxPercentage = percentage;
                    maxPercentageParty = stat.party;
                    continue;
                }
                if (percentage > maxPercentage) {
                    maxPercentage = percentage;
                    maxPercentageParty = stat.party;
                }
            }
            if (maxPercentage > 50) {
                return maxPercentageParty === "Democrat" ? 25 : 100;
            }
            else {
                return maxPercentageParty === "Democrat" ? 50 : 75;
            }
        }, data: data_1.default, tooltipOnClick: function (data) { return console.log(data); }, usingTooltip: true, onStateHover: function (data) { return console.log("guapayasos", data); }, onMouseOut: function (data) { return console.log("onMouseOut", data); }, map: USMap_1.default }, void 0));
};
exports.default = USElectionsMaps;
//# sourceMappingURL=USElectionsMap.js.map