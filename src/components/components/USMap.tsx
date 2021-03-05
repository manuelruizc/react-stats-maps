import React from 'react';
import MapSVGContainer from './MapSVGContainer';
import { NewHampshire, NewYork, Arkansas, Vermont, Massachusetts, RhodeIsland, Delaware, Connecticut, Pennsylvania, NewJersey, Maryland, Kentucky, WestVirginia, Ohio, Michigan, Indiana, Illinois, Wisconsin, Iowa, Minnesota, Missouri, NorthDakota, SouthDakota, Nebraska, Oklahoma, Kansas, Montana, Wyoming, Colorado, NewMexico, Arizona, Nevada, Utah, Idaho, California, Oregon, Washington, Alaska, Hawaii, Maine, Virginia, Tennessee, NorthCarolina, SouthCarolina, Alabama, Mississippi, Florida, Lousiana, Texas, Georgia } from './states/USStates';

 
const USMap: React.FC = () => {
    return (
        <MapSVGContainer>
            <NewHampshire />
            <Vermont />
            <NewYork />
            <Massachusetts />
            <RhodeIsland />
            <Delaware />
            <Connecticut />
            <Pennsylvania />
            <NewJersey />
            <Maryland />
            <Kentucky />
            <WestVirginia />
            <Ohio />
            <Michigan />
            <Indiana />
            <Illinois />
            <Wisconsin />
            <Iowa />
            <Minnesota />
            <Missouri />
            <Arkansas />
            <NorthDakota />
            <SouthDakota />
            <Nebraska />
            <Kansas />
            <Oklahoma />
            <Montana />
            <Wyoming />
            <Colorado />
            <NewMexico />
            <Arizona />
            <Nevada />
            <Utah />
            <Idaho />
            <California />
            <Oregon />
            <Washington />
            <Alaska />
            <Hawaii />
            <Maine />
            <Virginia />
            <Tennessee />
            <NorthCarolina />
            <SouthCarolina />
            <Georgia />
            <Alabama />
            <Mississippi />
            <Florida />
            <Lousiana />
            <Texas />
        </MapSVGContainer>
    );
}
 
export default USMap;