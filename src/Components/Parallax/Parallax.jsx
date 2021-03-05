import React, { useState } from "react";

    const ParallaxExample = (props) => {
        const [selected, setSelected] = useState(0)
    
        return (
            <div>
                <p id="toggle">
                    <span onClick={() => setSelected(0)}> Employer </span>
                    <span onClick={() => setSelected(1)}> Location </span>     
                </p>
    
                {(selected === 0) && <div id="left"> ..input box 1</div>}
                {(selected === 1) && <div id="right"> ..input box 2</div>}
            </div>
        )
    }
export default ParallaxExample;

