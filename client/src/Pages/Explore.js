import React, { useEffect, useState } from 'react'
import './Explore.css'
import Mentor from './components/Mentor';
import axios from 'axios';
import { BaseURL } from './BaseUrl';

export default function Explore() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [allMentors, setAllMentors] = useState([])

    // check if the user is logged in on the server
    useEffect(() => {
      if(localStorage.getItem("user")){
        setIsLoggedIn(true)
      }
    });

    useEffect(() => {
        localStorage.removeItem("currentMentorId");
        searchMentors()
      }, []);

    const searchMentors = () => {
        axios.get(`${BaseURL}findmentors`, {
            
        })
        .then(function (response) {
            // handle success
            setAllMentors(response.data.users)
            console.log(response.data.users)

        }).catch(function (err) {
            console.log(err.message);
        });
        
    };

  return (
    <div>
        {isLoggedIn?

            <div className='standard_bg'>
                    <h1 className='standard_heading4'>FIND MENTORS</h1>
                    <div className='allMentors'>
                    {allMentors.map(function(data) {
                        return (
                            <div className={"column"}><Mentor name={data.first + " " + data.last} college={data.college} major={data.major} _id={data._id}></Mentor></div>
                        )
                        })}
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