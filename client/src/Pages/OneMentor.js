import React, { useEffect, useState } from 'react'
import './OneMentor.css'
import { BaseURL } from './BaseUrl';
import axios from 'axios';

export default function OneMentor() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mentorId, setMentorId] = useState(null);
    const [thisMentor, setThisMentor] = useState(null);

    
    

    // check if the user is logged in on the server
    useEffect(() => {
        if(localStorage.getItem("user")){
          setIsLoggedIn(true)
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

    useEffect(() => {
      
    }, []);

    const searchMentors = async () => {
      console.log(mentorId)
      
      await axios.get(`${BaseURL}findonementor/${mentorId}`, {
          params:{
            _id: mentorId,
          }
      })
      .then(function(response) {
          setThisMentor(response.data.user)
          console.log(response.data.user.first)

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
                  <a className='goBackFixed' href={"/explore"}>🔙</a>
                  <button className='basic_button'>SEND CONNECTION REQUEST</button>

                  
                </div>:null
              }
              
            </div>

            :
            // if user is not logged in, direct them to login to the website
            <div className='standard_bg'>
                <div id='main_txt'>
                    <h1 className='standard_heading'>Please Login to Proceed</h1>
                    <a className='standard_btn' href={"/login"}>LOGIN HERE</a>
                </div>
            </div>
        
        }
    </div>
    
  )
}