import React, {useEffect} from 'react';
import "./Mentor.css"
import { useNavigate } from 'react-router-dom';


function Mentor(props) {
    const navigate = useNavigate();

    const mentorInfo = (mentorId) => {

        localStorage.setItem("currentMentorId", String(mentorId));

        navigate("/mentor");

        
    };

    return (
        <div>
            <div className={`mentorcard`}>
                <h1 className='mentor_name'>{props.name}</h1>
                <h3 className='mentor_college'>College attended: {props.college}</h3>
                <h3 className='mentor_major'>Major: {props.major}</h3>
                <button className='basic_button_black' onClick={()=>mentorInfo(props._id)}>LEARN MORE</button>
            </div>
        </div>
    );
}

export default Mentor;
