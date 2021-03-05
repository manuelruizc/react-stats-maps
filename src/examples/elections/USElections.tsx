import React, { useEffect, useState } from "react";
import data from "./data";
import "./us-elections.css";
import USElectionsMaps from "./USElectionsMap";

export interface USElectionsProps {}

const USElections: React.SFC<USElectionsProps> = () => {
  const [totalElectoralVotes, setTotalElectoralVotes] = useState({
    democratVotes: 0,
    republicanVotes: 0,
  });
  const getTotalElectoralVotesForDemocratAndRepublicanCandidates = () => {
    let democratVotes = 3;
    let republicanVotes = 0;
    for (let i = 0; i < data.length; i++) {
      const stateData = data[i];
      let winnerParty = "";
      let winnerPartyVotes = 0;
      for (let j = 0; j < stateData.statistics.length; j++) {
        const partyData = stateData.statistics[j];
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
      democratVotes,
      republicanVotes,
    };
  };
  useEffect(() => {
    const getElectoralVotes = getTotalElectoralVotesForDemocratAndRepublicanCandidates();
    setTotalElectoralVotes(getElectoralVotes);
  }, []);
  return (
    <div className="US-elections-container">
      <div className="total-votes-container">
        <div className="candidates-info-container">
          <Candidate
            name="Joe Biden"
            party="Democrat"
            electoralVotes={totalElectoralVotes.democratVotes}
          />
          <Candidate
            name="Donald J. Trump"
            party="Republican"
            electoralVotes={totalElectoralVotes.republicanVotes}
          />
        </div>
        <VotesBar>
          <VotesBarDataContainer>
            <VotesBarData
              electoralVotes={totalElectoralVotes.democratVotes}
              party="Democrat"
            />
            <VotesBarData
              electoralVotes={totalElectoralVotes.republicanVotes}
              party="Republican"
            />
          </VotesBarDataContainer>
        </VotesBar>
      </div>
      <div className="map-stats-container">
        <USElectionsMaps />
      </div>
    </div>
  );
};

interface CandidateInfoProps {
  name: string;
  electoralVotes: number;
  party: string;
}

const Candidate: React.SFC<CandidateInfoProps> = ({
  name,
  electoralVotes,
  party,
}) => {
  return (
    <div className="candidate-info-container">
      <span className="candidate-info">{name}</span>
      <div className="candidate-votes-data">
        <div className="candidate-img">
          <img
            src={
              party === "Democrat"
                ? "https://politics-static.cnn.io/2020/static-assets/images/headshots/biden-medium.png"
                : "https://politics-static.cnn.io/2020/static-assets/images/headshots/trump-medium.png"
            }
          />
        </div>
        <span>{electoralVotes}</span>
      </div>
    </div>
  );
};

const VotesBar = (props: any) => {
  const { children } = props;
  return (
    <div className="votes-bar-container">
      <span className="to-win">270 to win</span>
      {children}
    </div>
  );
};

const VotesBarDataContainer = (props: any) => (
  <div className="votes-bar-data-container">{props.children}</div>
);

export interface VotesBarDataProps {
  electoralVotes: number;
  party: string;
}

const VotesBarData: React.SFC<VotesBarDataProps> = ({
  electoralVotes,
  party,
}) => {
  const barPercentage = (100 / 538) * electoralVotes;
  return (
    <div
      style={{
        width: `${barPercentage}%`,
        height: "100%",
        backgroundColor:
          party === "Democrat" ? "rgb(3,155,215)" : "rgb(217,28,40)",
      }}
    />
  );
};
export default USElections;
