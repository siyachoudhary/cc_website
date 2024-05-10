import React, { useEffect, useState } from 'react'
import './Entry.css'
import background from "../../Resources/images/main_bg.jpeg"
import { useNavigate } from 'react-router-dom';

export default function Entry() {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("user")){
      navigate("/conantconnect/home")
    }
  });
  return (
    <div id='entry_bg'>
        <img src={background} id='bg_img'/>
        <div id='main_txt'>
            <h1 className='standard_heading'>CONANT CONNECT</h1>
            <a className='standard_btn' href={"/conantconnect/signup"}>GET STARTED</a>
            <br></br>
            <br></br>
            <a className='standard_link' href={"/conantconnect/login"}>Already signed up? Login here!</a>
        </div>
    </div>
  )
}