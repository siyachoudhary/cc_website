import React, { useEffect, useState } from 'react'
import './OneMentor.css'
import { BaseURL } from './BaseUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function OneMentor() {
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
          setMentorId(String(localStorage.getItem("currentMentorId")))
          if(mentorId!=null){
            searchMentors()
          }
        } catch (e){
          console.log(e)
        }}
        
    });

    const sendRequest = async()=>{
      await axios.post(`${BaseURL}sendRequest/`, {
        params:{
          mentorId: mentorId,
          myId: thisId,
          mentorEmail: thisMentor.email
        }
    })
    .then(function(response) {
        storeData(JSON.stringify(response.data.user))
        console.log("connection sent")
        navigate("/conantconnect/explore")

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
          console.log(isReqSent)

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
                  <h1 className='standard_heading3'>College Attended: {thisMentor.college}</h1>
                  <h1 className='standard_heading3'>Major: {thisMentor.major}</h1>
                  <br></br>
                  <h1 className='standard_heading3'>Mentor Bio:</h1>
                  <p className='paragraphBasic'>{thisMentor.bio}</p>
                  <p className='standard_paragraph'>My Interests:</p>

                  {thisMentor.interest.map(function(data) {
                            return (
                                <div className='interestOptions'>
                                    {data.label}
                                </div>
                            )})}
                  <br></br>
                  {isStudent?
                    <div className='buttonsForOneMentor'>
                      {isReqSent?
                        <div>
                          
                          <button className='basic_button' onClick={()=>navigate("/conantconnect/explore")}>BACK TO EXPLORE</button>
                          <p className='standard_paragraph'>*You have already sent this mentor a request</p>
                        </div>:<div>
                          {isFriend?
                            <div>
                              
                              <button className='basic_button' onClick={()=>navigate("/conantconnect/explore")}>BACK TO EXPLORE</button>
                              <p className='standard_paragraph'>*This mentor is already your friend</p>
                            </div>:
                            <div>
                              <a className='goBackFixed' href={"/conantconnect/explore"}>🔙</a>
                              <button className='basic_button' onClick={()=>sendRequest()}>SEND CONNECTION REQUEST</button>
                            </div>
                          }
                        </div>
                      }
                  </div>:<div className='buttonsForOneMentor'>
                    <button className='basic_button' onClick={()=>navigate("/conantconnect/explore")}>BACK TO EXPLORE</button>
                  </div>
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