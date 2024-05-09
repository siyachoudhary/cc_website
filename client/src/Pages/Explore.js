import React, { useEffect, useState } from 'react'
import './Explore.css'
import Mentor from './components/Mentor';
import axios from 'axios';
import { BaseURL } from './BaseUrl';
import Select from 'react-select'
import {options} from "./SkillOptions"
import { useNavigate } from 'react-router-dom';

export default function Explore() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [allMentors, setAllMentors] = useState([])
    const navigate = useNavigate();

    // check if the user is logged in on the server
    useEffect(() => {
      if(localStorage.getItem("user")){
        setIsLoggedIn(true)
      }
    });

    useEffect(() => {
        localStorage.removeItem("currentMentorId");
        searchMentors(selectedOptions)
        
      }, []);

    const searchMentors = (selectedOptionHere) => {
      let selectedInterests = []

      for (var i = 0; i<selectedOptionHere.length; i++) {
          selectedInterests.push(selectedOptionHere[i])
      }

      // console.log(selectedInterests)

        axios.post(`${BaseURL}findmentors`, {
            interest: selectedInterests,
        })
        .then(function (response) {
            // handle success
            setAllMentors(response.data.users)
            console.log(response.data.users)

        }).catch(function (err) {
            console.log(err.message);
        });
      
    };

    const [selectedOptions, setSelectedOptions] = useState([])

    const handleItemChange = (selectedOption) => {
      setSelectedOptions(selectedOption);
      searchMentors(selectedOption)
    };
    

  return (
    <div>
        {isLoggedIn?

            

            <div className='standard_bg'>
                <h1 className='standard_heading4'>FIND MENTORS</h1>
                    <div className='form_row'>
                                <div className='form_item'>
                                <p>FILTERED BASED ON SKILLS AND INTERESTS:</p>
                                <Select
                                    isMulti
                                    name="colors"
                                    options={options}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    value={selectedOptions}
                                    onChange={handleItemChange}
                                />
                                </div>
                            </div>

                    
                    <div className='allMentors'>
                    {allMentors.map(function(data) {
                        return (
                            <div className={"column"}><Mentor name={data.first + " " + data.last} college={data.college} major={data.major} _id={data._id}></Mentor></div>
                        )
                        })}

                    {/* <h1 className='standard_heading3'>THIS IS THE END OF ALL MENTORS</h1> */}
                        
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