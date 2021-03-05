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
var numberWithCommas = function (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
var Tooltip = function (_a) {
    var item = _a.item;
    if (!item) {
        return (jsx_runtime_1.jsx("div", { children: jsx_runtime_1.jsx("span", { children: "There's no data" }, void 0) }, void 0));
    }
    var stateCode = item.stateCode, stateName = item.stateName, statistics = item.statistics, electoralVotes = item.electoralVotes, totalVotes = item.totalVotes;
    var winnerCandidate = "";
    var winnerParty = "";
    var winnerVotes = 0;
    for (var i = 0; i < statistics.length; i++) {
        var stat = statistics[i];
        var candidate = stat.candidate, party = stat.party, votes = stat.votes;
        if (i === 0) {
            winnerCandidate = candidate;
            winnerParty = party;
            winnerVotes = votes;
            continue;
        }
        if (votes > winnerVotes) {
            winnerCandidate = candidate;
            winnerParty = party;
            winnerVotes = votes;
        }
    }
    var winnerCandidateLastNameArray = winnerCandidate.split(" ");
    var winnerCandidateLastName = winnerCandidateLastNameArray[winnerCandidateLastNameArray.length - 1];
    return (jsx_runtime_1.jsxs("div", __assign({ className: "custom-tooltip" }, { children: [jsx_runtime_1.jsx("div", { style: {
                    backgroundColor: winnerParty === "Democrat" ? "rgb(3,155,215)" : "rgb(217,28,40)",
                }, className: "winner-bar" }, void 0),
            jsx_runtime_1.jsx("div", __assign({ className: "tooltip-header" }, { children: jsx_runtime_1.jsxs("div", __assign({ className: "tooltip-header-info" }, { children: [jsx_runtime_1.jsxs("div", __assign({ className: "tooltip-header-winner-data" }, { children: [jsx_runtime_1.jsxs("span", __assign({ className: "president-name" }, { children: ["President: ", stateName, " (", stateCode, ")"] }), void 0),
                                jsx_runtime_1.jsxs("span", __assign({ className: "electoral-votes" }, { children: [electoralVotes, " Electoral Votes"] }), void 0)] }), void 0),
                        jsx_runtime_1.jsxs("div", __assign({ style: {
                                color: winnerParty === "Democrat"
                                    ? "rgb(3,155,215)"
                                    : "rgb(217,28,40)",
                            }, className: "projected-winner-container" }, { children: [jsx_runtime_1.jsx("span", __assign({ className: "projected-winner-candidate" }, { children: winnerCandidateLastName }), void 0),
                                jsx_runtime_1.jsx("span", __assign({ className: "projected-winner-label" }, { children: "Projected winner" }), void 0)] }), void 0)] }), void 0) }), void 0),
            jsx_runtime_1.jsxs("div", __assign({ className: "votes-data-container" }, { children: [jsx_runtime_1.jsxs("div", __assign({ className: "votes-data-row votes-data-header" }, { children: [jsx_runtime_1.jsx("span", { children: "Candidate" }, void 0),
                            jsx_runtime_1.jsx("span", { children: "%" }, void 0),
                            jsx_runtime_1.jsx("span", { children: "Votes" }, void 0)] }), void 0),
                    statistics.map(function (stat) {
                        var percentage = (100 / totalVotes) * stat.votes;
                        return (jsx_runtime_1.jsxs("div", __assign({ className: "votes-data-row" }, { children: [jsx_runtime_1.jsx("span", { children: stat.candidate }, void 0),
                                jsx_runtime_1.jsxs("span", { children: [percentage.toFixed(2), "%"] }, void 0),
                                jsx_runtime_1.jsx("span", { children: numberWithCommas(stat.votes) }, void 0)] }), stat.candidate + stateCode));
                    })] }), void 0)] }), void 0));
};
exports.default = Tooltip;
//# sourceMappingURL=Tooltip.js.map