import React, { useEffect, useState } from 'react'
import './Explore.css'
import './OneMentor.js'
import { BaseURL } from './BaseUrl';
import axios from 'axios';
import Mentor from './components/Mentor.js';
import Student from './components/Student.js';
import { useNavigate } from 'react-router-dom';
let nextId1 = 0;
let nextId2 = 0;
export default function MyStudents() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [pending, setPending] = useState([]);
    const [accepted, setAccepted] = useState([]);
    const navigate = useNavigate();


    // check if the user is logged in on the server
    useEffect(() => {
        
        if(localStorage.getItem("user")){
            setIsLoggedIn(true)

            if(isLoggedIn){

                console.log(isLoggedIn)

                const thisUser = JSON.parse(localStorage.getItem("user"))
                let mentorPendings = thisUser.pending
                let mentorAccepted = thisUser.accepted

                searchMentors(mentorPendings, mentorAccepted)
            }

        }
        
    },[isLoggedIn]);

    const searchMentors = async (pendingUsers, acceptedUsers) => {
        // add all pending mentors
        for (let i = 0; i < pendingUsers.length; i++) {
            await axios.get(`${BaseURL}findonementor/${pendingUsers[i]}`, {
                params:{
                  _id: pendingUsers[i],
                }
            })
            .then(function(response) {
                console.log(response.data.user)
                setPending(pending => [...pending, response.data.user]);
                // pending.push(response.data.user);
                
            }).catch(function (err) {
                console.log(err.message);
            });
        }

        console.log(pending)

        // add all accepted mentors
        for (let i = 0; i < acceptedUsers.length; i++) {
            await axios.get(`${BaseURL}findonementor/${acceptedUsers[i]}`, {
                params:{
                  _id: acceptedUsers[i],
                }
            })
            .then(function(response) {
                setAccepted(accepted => [...accepted, response.data.user]);
                // accepted.push(response.data.user);
                
            }).catch(function (err) {
                console.log(err.message);
            });
        }

        console.log(accepted)
      
  };

  return (
    <div>
        {isLoggedIn?

            <div className='standard_bg'>
                <div className='mentorsSection'>
                    <div className='accepted'>
                        <h1 className='standard_heading4'>YOUR STUDENTS</h1>
                        <div className='allMentors'>
                            {accepted.map(function(data) {
                                return (
                                    <div className={"column"}><Student name={data.first + " " + data.last} grade={data.grade} email={data.email} _id={data._id}></Student></div>
                                )
                                })}
                        </div>
                        {accepted.length==0?<h1 className='standard_heading3'>YOU HAVE NO MENTORS</h1>:null}
                        <br></br>

                    </div>

                    <div className='pending'>
                        <h1 className='standard_heading4'>YOUR PENDING REQUESTS</h1>
                        <div className='allMentors'>
                            {pending.map(function(data) {
                                return (
                                    <div className={"column"}><Student name={data.first + " " + data.last} grade={data.grade} email={data.email} _id={data._id}></Student></div>
                                )
                            })}



                        </div>
                        {pending.length==0?<h1 className='standard_heading3'>YOU HAVE NO PENDING REQUESTS</h1>:null}

                    </div>

                    
                    
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