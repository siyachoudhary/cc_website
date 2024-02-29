import React, { useEffect, useState } from 'react'
import './OneMentor.css'
import { BaseURL } from './BaseUrl';
import axios from 'axios';

export default function OneMentor() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mentorId, setMentorId] = useState(null);

    // check if the user is logged in on the server
    useEffect(() => {
      if(localStorage.getItem("user")){
        setIsLoggedIn(true)
      }
      try {
        setMentorId(String(localStorage.getItem("currentMentorId")))
        if(mentorId!=null){
          searchMentors()
        }
      } catch (e){
        console.log(e)
      }
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
        // console.log(localStorage.getItem("currentMentorId"))
          // handle success
          // setAllMentors(response.data.user)
          console.log(response.data)

      }).catch(function (err) {
          console.log(err.message);
      });
      
  };

  return (
    <div>
        {isLoggedIn?

            <div className='standard_bg'>
                <div id='main_txt'>
                    <h1 className='standard_heading'>CONANT CONNECT</h1>
                </div>
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