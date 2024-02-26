import React from 'react'
import './Entry.css'
import background from "../../Resources/images/main_bg.jpeg"

export default function Entry() {
  return (
    <div id='entry_bg'>
        <img src={background} id='bg_img'/>
        <div id='main_txt'>
            <h1 className='standard_heading'>CONANT CONNECT</h1>
            <a className='standard_btn' href={"/signup"}>GET STARTED</a>
            <br></br>
            <br></br>
            <a className='standard_link' href={"/login"}>Already signed up? Login here!</a>
        </div>
    </div>
  )
}