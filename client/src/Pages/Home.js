import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
import CountUp from "react-countup";
import axios from 'axios';
import { BaseURL } from './BaseUrl';


export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [students, setStudents] = useState();
    const [mentors, setMentors] = useState();
    const [connects, setConnects] = useState();

    // check if the user is logged in on the server
    useEffect(() => {
      if(localStorage.getItem("user")){
        setIsLoggedIn(true)
      }

      axios.get(`${BaseURL}findStats/`, {
        
      })
      .then(function(response) {
          console.log(response)
          setStudents(response.data.totalStudents)
          setMentors(response.data.totalMentors)

      }).catch(function (err) {
          console.log(err.message);
      });
      
    });

    const sectionRef = useRef(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    // const handleScroll = () => {
    //   if (sectionRef.current) {
    //     const rect = sectionRef.current.getBoundingClientRect();
    //     const isSectionInView = rect.top <= window.innerHeight && rect.bottom >= 0;

    //     if (isSectionInView && !counted) {
          // Start the count-up animation
          setCounted(true);
    //     }
    //   }
    // };

    // window.addEventListener('scroll', handleScroll);
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
  }, [counted]);

  return (
    <div>
        {isLoggedIn?

            <div className='standard_bg'>
                <div className='intro'>
                    <div>
                      <h1 className='standard_heading4'>WELCOME TO CONANT CONNECT</h1>
                      <h2 className='standard_heading2'>THE ONE-STOP SHOP TO CONNECT CURRENT HIGH SCHOOL STUDENTS WITH COLLEGE AND GRADUATED STUDENTS</h2>
                    </div>
                    <div>
                      <a className='standard_btn' href={"/explore"}>EXPLORE NOW</a>
                      <h3 className='standard_heading2'>Seek advice, give advice. Our mission is to help high school students navigate the intricacies of college and careers with the click of a button</h3>
                    </div>

                    <h2 className='standard_heading2'>CONANT CONNECT IN THE NUMBERS:</h2>
                    <div className='stats'>
                      <div className='oneStat'>
                        <div ref={sectionRef} className="count-up-section">
                          {counted && <div className="count-up-animation"><h1><CountUp end = {students} duration = {2}></CountUp></h1></div>}
                        </div>
                        <h2>STUDENTS</h2>
                      </div>
                      <div className='oneStat'>
                        <div ref={sectionRef} className="count-up-section">
                          {counted && <div className="count-up-animation"><h1><CountUp end = {mentors} duration = {2}></CountUp></h1></div>}
                        </div>
                        <h2>MENTORS</h2>
                      </div>
                      {/* <div className='oneStat'>
                        <div ref={sectionRef} className="count-up-section">
                          {counted && <div className="count-up-animation"><h1><CountUp end = {connects} duration = {6}></CountUp></h1></div>}
                        </div>
                        <h2>CONNECTIONS</h2>
                      </div> */}
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