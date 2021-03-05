import * as React from "react";
const numberWithCommas = (number: number): string =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const Tooltip = ({ item }: any) => {
  if (!item) {
    return (
      <div>
        <span>There's no data</span>
      </div>
    );
  }
  const { stateCode, stateName, statistics, electoralVotes, totalVotes } = item;
  let winnerCandidate = "";
  let winnerParty = "";
  let winnerVotes = 0;
  for (let i = 0; i < statistics.length; i++) {
    const stat = statistics[i];
    const { candidate, party, votes } = stat;
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
  let winnerCandidateLastNameArray: string[] = winnerCandidate.split(" ");
  const winnerCandidateLastName =
    winnerCandidateLastNameArray[winnerCandidateLastNameArray.length - 1];
  return (
    <div className="custom-tooltip">
      <div
        style={{
          backgroundColor:
            winnerParty === "Democrat" ? "rgb(3,155,215)" : "rgb(217,28,40)",
        }}
        className="winner-bar"
      />
      <div className="tooltip-header">
        <div className="tooltip-header-info">
          <div className="tooltip-header-winner-data">
            <span className="president-name">
              President: {stateName} ({stateCode})
            </span>
            <span className="electoral-votes">
              {electoralVotes} Electoral Votes
            </span>
          </div>
          <div
            style={{
              color:
                winnerParty === "Democrat"
                  ? "rgb(3,155,215)"
                  : "rgb(217,28,40)",
            }}
            className="projected-winner-container"
          >
            <span className="projected-winner-candidate">
              {winnerCandidateLastName}
            </span>
            <span className="projected-winner-label">Projected winner</span>
          </div>
        </div>
      </div>
      <div className="votes-data-container">
        <div className="votes-data-row votes-data-header">
          <span>Candidate</span>
          <span>%</span>
          <span>Votes</span>
        </div>
        {statistics.map((stat: any) => {
          const percentage = (100 / totalVotes) * stat.votes;
          return (
            <div key={stat.candidate + stateCode} className="votes-data-row">
              <span>{stat.candidate}</span>
              <span>{percentage.toFixed(2)}%</span>
              <span>{numberWithCommas(stat.votes)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tooltip;
