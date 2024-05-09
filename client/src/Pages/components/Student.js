import React, {useEffect} from 'react';
import "./Mentor.css"
import { useNavigate } from 'react-router-dom';


function Student(props) {
    const navigate = useNavigate();

    const mentorInfo = (mentorId) => {

        localStorage.setItem("currentStudentId", String(mentorId));

        navigate("/student");

        
    };

    return (
        <div>
            <div className={`mentorcard`}>
                <h1 className='mentor_name'>{props.name}</h1>
                <h3 className='mentor_grade'>Grade Level: {props.grade}</h3>
                <h3 className='mentor_major'>Email: {props.email}</h3>
                <button className='basic_button_black' onClick={()=>mentorInfo(props._id)}>LEARN MORE</button>
            </div>
        </div>
    );
}

export default Student;
