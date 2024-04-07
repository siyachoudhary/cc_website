import React, { useEffect, useState } from 'react'
import './Home.css'

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // check if the user is logged in on the server
    useEffect(() => {
      if(localStorage.getItem("user")){
        setIsLoggedIn(true)
      }
    });

  return (
    <div>
        {isLoggedIn?

            <div className='standard_bg'>
                <div>
                    <h1 className='standard_heading'>WELCOME TO CONANT CONNECT</h1>
                    <h2 className='standard_heading3'>THE ONE-STOP SHOP TO CONNECT CURRENT HIGH SCHOOL STUDENTS WITH COLLEGE AND GRADUATED STUDENTS</h2>
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