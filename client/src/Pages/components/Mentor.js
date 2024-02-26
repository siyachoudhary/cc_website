import React, {useEffect} from 'react';
import "./Mentor.css"


function Mentor(props) {

    return (
        <div>
            <div className={`mentorcard`}>
                <p>mentor</p>
                <h1>{props.name}</h1>
                <h3>{props.college}</h3>
                <h3>{props.major}</h3>
                <button>Learn More</button>
            </div>
        </div>
    );
}

export default Mentor;
