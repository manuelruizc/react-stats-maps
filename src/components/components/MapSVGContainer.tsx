import * as React from 'react';

interface Props {
    children: React.ReactNode;
}


const MapSVGContainer: React.FC<Props> = (props: Props) => {
    return(
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 1000 812" style={{width:'100%', height: '100%'}} xmlSpace="preserve">
            {props.children}
        </svg>
    );
}
 
export default MapSVGContainer;