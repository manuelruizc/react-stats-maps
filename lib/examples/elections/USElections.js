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
var react_1 = require("react");
var data_1 = __importDefault(require("./data"));
require("./us-elections.css");
var USElectionsMap_1 = __importDefault(require("./USElectionsMap"));
var USElections = function () {
    var _a = react_1.useState({
        democratVotes: 0,
        republicanVotes: 0,
    }), totalElectoralVotes = _a[0], setTotalElectoralVotes = _a[1];
    var getTotalElectoralVotesForDemocratAndRepublicanCandidates = function () {
        var democratVotes = 3;
        var republicanVotes = 0;
        for (var i = 0; i < data_1.default.length; i++) {
            var stateData = data_1.default[i];
            var winnerParty = "";
            var winnerPartyVotes = 0;
            for (var j = 0; j < stateData.statistics.length; j++) {
                var partyData = stateData.statistics[j];
                if (j === 0) {
                    winnerParty = partyData.party;
                    winnerPartyVotes = partyData.votes;
                }
                if (partyData.votes > winnerPartyVotes) {
                    winnerParty = partyData.party;
                    winnerPartyVotes = partyData.votes;
                }
            }
            winnerParty === "Democrat"
                ? (democratVotes += stateData.electoralVotes)
                : (republicanVotes += stateData.electoralVotes);
        }
        return {
            democratVotes: democratVotes,
            republicanVotes: republicanVotes,
        };
    };
    react_1.useEffect(function () {
        var getElectoralVotes = getTotalElectoralVotesForDemocratAndRepublicanCandidates();
        setTotalElectoralVotes(getElectoralVotes);
    }, []);
    return (jsx_runtime_1.jsxs("div", __assign({ className: "US-elections-container" }, { children: [jsx_runtime_1.jsxs("div", __assign({ className: "total-votes-container" }, { children: [jsx_runtime_1.jsxs("div", __assign({ className: "candidates-info-container" }, { children: [jsx_runtime_1.jsx(Candidate, { name: "Joe Biden", party: "Democrat", electoralVotes: totalElectoralVotes.democratVotes }, void 0),
                            jsx_runtime_1.jsx(Candidate, { name: "Donald J. Trump", party: "Republican", electoralVotes: totalElectoralVotes.republicanVotes }, void 0)] }), void 0),
                    jsx_runtime_1.jsx(VotesBar, { children: jsx_runtime_1.jsxs(VotesBarDataContainer, { children: [jsx_runtime_1.jsx(VotesBarData, { electoralVotes: totalElectoralVotes.democratVotes, party: "Democrat" }, void 0),
                                jsx_runtime_1.jsx(VotesBarData, { electoralVotes: totalElectoralVotes.republicanVotes, party: "Republican" }, void 0)] }, void 0) }, void 0)] }), void 0),
            jsx_runtime_1.jsx("div", __assign({ className: "map-stats-container" }, { children: jsx_runtime_1.jsx(USElectionsMap_1.default, {}, void 0) }), void 0)] }), void 0));
};
var Candidate = function (_a) {
    var name = _a.name, electoralVotes = _a.electoralVotes, party = _a.party;
    return (jsx_runtime_1.jsxs("div", __assign({ className: "candidate-info-container" }, { children: [jsx_runtime_1.jsx("span", __assign({ className: "candidate-info" }, { children: name }), void 0),
            jsx_runtime_1.jsxs("div", __assign({ className: "candidate-votes-data" }, { children: [jsx_runtime_1.jsx("div", __assign({ className: "candidate-img" }, { children: jsx_runtime_1.jsx("img", { src: party === "Democrat"
                                ? "https://politics-static.cnn.io/2020/static-assets/images/headshots/biden-medium.png"
                                : "https://politics-static.cnn.io/2020/static-assets/images/headshots/trump-medium.png" }, void 0) }), void 0),
                    jsx_runtime_1.jsx("span", { children: electoralVotes }, void 0)] }), void 0)] }), void 0));
};
var VotesBar = function (props) {
    var children = props.children;
    return (jsx_runtime_1.jsxs("div", __assign({ className: "votes-bar-container" }, { children: [jsx_runtime_1.jsx("span", __assign({ className: "to-win" }, { children: "270 to win" }), void 0), children] }), void 0));
};
var VotesBarDataContainer = function (props) { return (jsx_runtime_1.jsx("div", __assign({ className: "votes-bar-data-container" }, { children: props.children }), void 0)); };
var VotesBarData = function (_a) {
    var electoralVotes = _a.electoralVotes, party = _a.party;
    var barPercentage = (100 / 538) * electoralVotes;
    return (jsx_runtime_1.jsx("div", { style: {
            width: barPercentage + "%",
            height: "100%",
            backgroundColor: party === "Democrat" ? "rgb(3,155,215)" : "rgb(217,28,40)",
        } }, void 0));
};
exports.default = USElections;
//# sourceMappingURL=USElections.js.map