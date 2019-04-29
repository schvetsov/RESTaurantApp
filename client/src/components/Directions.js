import React from 'react';

const Directions = (props) => (
    <>
        {props.directions[props.index].map((_, i) => 
            <div 
                key={i} 
                dangerouslySetInnerHTML = {{ 
                    __html: props.directions[props.index][i] 
                }} />
        )}
    </>
)

export default Directions;
