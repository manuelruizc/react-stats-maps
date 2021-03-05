import * as React from 'react';
import MapSVGContainer from './MapSVGContainer';
import { Aguascalientes, BajaCalifornia, BajaCaliforniaSur, Campeche, Chiapas, Chihuahua, Coahuila, Colima, DF, Durango, EstadoDeMexico, Guanajuato, Guerrero, Hidalgo, Jalisco, Michoacan, Morelos, Nayarit, NuevoLeon, Oaxaca, Puebla, Queretaro, QuintanaRoo, SanLuisPotosi, Sinaloa, Sonora, Tabasco, Tamaulipas, Tlaxcala, Veracruz, Yucatan, Zacatecas } from './states/MXStates';

export interface MXMapProps {
    
}
 
const MXMap: React.FC = () => {
    return (
        <MapSVGContainer>
            <Aguascalientes />
            <BajaCalifornia />
            <BajaCaliforniaSur />
            <Campeche />
            <Chiapas />
            <Chihuahua />
            <Coahuila />
            <Colima />
            <DF />
            <Durango />
            <Guanajuato />
            <Guerrero />
            <Hidalgo />
            <Jalisco />
            <EstadoDeMexico />
            <Michoacan />
            <Morelos />
            <Nayarit />
            <NuevoLeon />
            <Oaxaca />
            <Puebla />
            <Queretaro />
            <QuintanaRoo />
            <SanLuisPotosi />
            <Sinaloa />
            <Sonora />
            <Tabasco />
            <Tamaulipas />
            <Tlaxcala />
            <Veracruz />
            <Yucatan />
            <Zacatecas />
        </MapSVGContainer>
    );
}
 
export default MXMap;