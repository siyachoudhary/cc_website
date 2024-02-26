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