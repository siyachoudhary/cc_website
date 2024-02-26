import React, {useEffect} from 'react';
import "./Mentor.css"


function Mentor(props) {

    return (
        <div>
            <div className={`mentorcard`}>
                <h1 className='mentor_name'>{props.name}</h1>
                <h3 className='mentor_college'>College attended: {props.college}</h3>
                <h3 className='mentor_major'>Major: {props.major}</h3>
                <button className='basic_button_black'>LEARN MORE</button>
            </div>
        </div>
    );
}

export default Mentor;
