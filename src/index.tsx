import React from "react";
import ReactDOM from "react-dom";
import data from "./data.js";
import StatMap from "./export.js";
import { USMap } from "./maps.js";

const politicalDivision = { width: 1, color: "#222" };

ReactDOM.render(
  <React.StrictMode>
    <StatMap
      colors={[
        "rgb(3,155,215)",
        "rgba(3,155,215, 0.7)",
        "rgba(217,28,40,0.7)",
        "rgb(217,28,40)",
      ]}
      stateDefaultColor={"beige"}
      politicalDivision={politicalDivision}
      limits={["Active Cases", "desc", [0, 25, 50, 75]]}
      defaultTooltipClassName={"election-tooltip"} // default ''
      defaultTooltipStyle={{}} // object
      customLimitComparative={(data: any) => {
        const { stateCode, statistics, totalVotes } = data;
        let maxPercentage = 0;
        let maxPercentageParty = "";
        for (let i = 0; i < statistics.length; i++) {
          const stat = statistics[i];
          const percentage = (100 / totalVotes) * stat.value;
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
        } else {
          return maxPercentageParty === "Democrat" ? 50 : 75;
        }
      }}
      data={data}
      // tooltipOnClick={(data: any) => console.log(data)}
      usingTooltip={true}
      // onStateHover={(data: any) => console.log("guapayasos", data)}
      // onMouseOut={(data: any) => console.log("onMouseOut", data)}
      map={USMap}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
