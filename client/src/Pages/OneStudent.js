import React, { useEffect, useState } from 'react'
import './OneMentor.css'
import { BaseURL } from './BaseUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function OneStudent() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mentorId, setMentorId] = useState(null);
    const [thisMentor, setThisMentor] = useState(null);
    const [isStudent, setIsStudent] = useState(false);
    const [thisId, setThisId] = useState(false);
    const [isReqSent, setIsReqSent] = useState(false);
    const [isFriend, setIsFriend] = useState(false);
    const navigate = useNavigate();

    // check if the user is logged in on the server
    useEffect(() => {
        if(localStorage.getItem("user")){
          setIsLoggedIn(true)
          const thisUser = JSON.parse(localStorage.getItem("user"))

          if(thisUser.user_type=="student"){
            setIsStudent(true)
          }

          setThisId(thisUser._id)
        }
        if(thisMentor==null){
        try {
          setMentorId(String(localStorage.getItem("currentStudentId")))
          if(mentorId!=null){
            searchMentors()
          }
        } catch (e){
          console.log(e)
        }}
        
    });

    const acceptRequest = async()=>{
      await axios.post(`${BaseURL}acceptRequest/`, {
        params:{
          studentId: mentorId,
          mentorId: thisId,
          studentEmail: thisMentor.email
        }
    })
    .then(function(response) {
        storeData(JSON.stringify(response.data.user))
        console.log("accepted")
        navigate("/conantconnect/MyStudents")

    }).catch(function (err) {
        console.log(err.message);
    });
    }

    //   store user locally for easy access
    const storeData = async (value) => {
      try {
          console.log(value)
          await localStorage.setItem("user", value);
          window.location.reload()
          console.log("stored data")
      } catch (e) {
          // saving error
          console.log(e.message)
      }
    }

    const searchMentors = async () => {
      console.log(mentorId)
      
      await axios.get(`${BaseURL}findonementor/${mentorId}`, {
          params:{
            _id: mentorId,
          }
      })
      .then(function(response) {
          setThisMentor(response.data.user)
          const userPendings = response.data.user.pending
          userPendings.forEach(pending => {
            if(pending==thisId){
              setIsReqSent(true)
            }
          });
          const userAccepted = response.data.user.accepted
          userAccepted.forEach(accepted => {
            if(accepted==thisId){
              setIsFriend(true)
            }
          });
          

      }).catch(function (err) {
          console.log(err.message);
      });
  };

  return (
    <div>
        {isLoggedIn?

            <div className='standard_bg'>

              {thisMentor!=null?
                <div>
                  <h1 className='standard_heading4'>{thisMentor.first} {thisMentor.last}</h1>
                  {isFriend?<h1 className='standard_heading3'>Email: {thisMentor.email}</h1>:null}
                  <h1 className='standard_heading3'>Grade Level: {thisMentor.grade}</h1>
                  <br></br>
                  <h1 className='standard_heading3'>Student Bio:</h1>
                  <p className='paragraphBasic'>{thisMentor.bio}</p>
                  <p className='standard_paragraph'>My Interests:</p>

                  {thisMentor.interest.map(function(data) {
                            return (
                                <div className='interestOptions'>
                                    {data.label}
                                </div>
                            )})}
                  <br></br>
                  {!isStudent?
                    <div className='buttonsForOneMentor'>
                      {isReqSent?
                        <div>
                          <button className='basic_button basic3' onClick={()=>acceptRequest()}>ACCEPT REQUEST</button>
                          <br></br>
                          <button className='basic_button basic3' onClick={()=>navigate("/conantconnect/MyStudents")}>BACK TO MY STUDENTS</button>
                          
                        </div>:<button className='basic_button basic3' onClick={()=>navigate("/conantconnect/MyStudents")}>BACK TO MY STUDENTS</button>
                      }
                  </div>:null
                }
                  

                  
                </div>:null
              }
              
            </div>

            :
            // if user is not logged in, direct them to login to the website
            <div className='standard_bg'>
                <div id='main_txt'>
                    <h1 className='standard_heading'>Please Login to Proceed</h1>
                    <a className='standard_btn' href={"/conantconnect/login"}>LOGIN HERE</a>
                </div>
            </div>
        
        }
    </div>
    
  )
}