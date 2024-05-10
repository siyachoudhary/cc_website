import React, { useEffect, useState } from 'react'
import './Profile.css'
import { BaseURL } from './BaseUrl';
import axios from 'axios';
import Select from 'react-select'
import { confirmAlert } from 'react-confirm-alert';
import {options} from "./SkillOptions"

export default function Profile() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [thisId, setThisId] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([])

    // check if the user is logged in on the server
    useEffect(() => {
        if(localStorage.getItem("user")){
        const thisUser = JSON.parse(localStorage.getItem("user"))
          setThisId(thisUser._id)
        }
    });
    // const options = [
    //     { value: 'machine learning', label: 'Machine Learning' },
    //     { value: 'data science', label: 'Data Science' },
    //     { value: 'database', label: 'Database Management' },
    //     { value: 'frontend', label: 'Frontend Development' },
    //     { value: 'game', label: 'Game Design' },
    //     { value: 'algos', label: 'Algorithms' },
    //     { value: 'ai', label: 'Artificial Intelligence' },
    //     { value: 'other', label: 'Other' },
    // ]

    let completedInterestAdding = false

    // check if the user is logged in on the server
    useEffect(() => {
      if(localStorage.getItem("user")){
        setIsLoggedIn(true)

        const thisUser = JSON.parse(localStorage.getItem("user"))

        setIsComplete(thisUser.complete)

        if(!thisUser.complete){
            setIsEditing(true)
        }
        if(thisUser.user_type=="student"){
            setIsStudent(true)
        }

        setFormData({
                ["first"]: thisUser.first,
                ["last"]: thisUser.last,
                ["email"]: thisUser.email,
                ["grade"]: thisUser.grade,
                ["college"]: thisUser.college,
                ["major"]: thisUser.major,
                ["bio"]: thisUser.bio
        });
        if(!completedInterestAdding){
            if(thisUser.interest.length>0){
            for (let index = 0; index < thisUser.interest.length; index++) {
                if(thisUser.interest[index].value=="machine learning"){
                    setSelectedOptions(prevArray => [...prevArray, options[0]])
                }
                if(thisUser.interest[index].value=="data science"){
                    setSelectedOptions(prevArray => [...prevArray, options[1]])
                }
                if(thisUser.interest[index].value=="database"){
                    setSelectedOptions(prevArray => [...prevArray, options[2]])
                }
                if(thisUser.interest[index].value=="frontend"){
                    setSelectedOptions(prevArray => [...prevArray, options[3]])
                }
                if(thisUser.interest[index].value=="game"){
                    setSelectedOptions(prevArray => [...prevArray, options[4]])
                }
                if(thisUser.interest[index].value=="algos"){
                    setSelectedOptions(prevArray => [...prevArray, options[5]])
                }
                if(thisUser.interest[index].value=="ai"){
                    setSelectedOptions(prevArray => [...prevArray, options[6]])
                }
                if(thisUser.interest[index].value=="other"){
                    setSelectedOptions(prevArray => [...prevArray, options[7]])
                }}
        }}

        completedInterestAdding = true
      }
    }, []);

    // edit form items
    const [formData, setFormData] = useState({
        email: "",
        first: "",
        last: "",
        grade: "",
        college: "",
        major: "",
        bio: "",
      });

      const [emailError, setEmailError] = useState("");
      const [firstError, setFirstError] = useState("");
      const [lastError, setLastError] = useState("");
      const [gradeError, setGradeError] = useState("");
      const [collegeError, setcollegeError] = useState("");
      const [majorError, setMajorError] = useState("");
      const [bioError, setBioError] = useState("");

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };

      const handleItemChange = (selectedOption) => {
        setSelectedOptions(selectedOption);
      };

      const handleSubmit = (e) => {
        
        e.preventDefault(); // Prevent the default form submission behavior

        let selectedInterests = []

        for (var i = 0; i<selectedOptions.length; i++) {
            selectedInterests.push(selectedOptions[i])
        }

        setFirstError("")
        setLastError("")
        setEmailError("")
        setcollegeError("")
        setMajorError("")
        setGradeError("")

        var noErrors = true
    
        // Here you can handle the submission by sending the form data to a server
        console.log('Form Data:', formData);

        // if (formData.email.includes(' ')) {
        //     setEmailError("Email cannot include spaces")
        //     noErrors = false
        // }

        // validations to ensure all the data entered is good 
        if(formData.first.length==0){
            setFirstError("Please enter your first name")
            noErrors = false
        }
        if(formData.last.length==0){
            setLastError("Please enter your last name")
            noErrors = false
        }
        // if(formData.email.length==0){
        //     setEmailError("Please enter your email")
        //     noErrors = false
        // }else{
        //     if(!formData.email.includes("@") && !formData.email.includes(".")){
        //         setEmailError("Please enter a valid email")
        //         noErrors = false
        //     }
        // }
        if(isStudent){
            if(formData.grade.length==0){
                setGradeError("Please enter your high school grade level")
                noErrors = false
            }
        }else{
            if(formData.college.length==0){
                setcollegeError("Please enter your college name")
                noErrors = false
            }
            if(formData.major.length==0){
                setMajorError("Please enter your college major")
                noErrors = false
            }
        }

        if(noErrors){

            if(isStudent){
                // register if user is a student
                axios.post(`${BaseURL}editstudent`, {
                    first: formData.first,
                    last: formData.last,
                    email: formData.email.toLowerCase(),
                    grade: formData.grade,
                    complete: true,
                    bio: formData.bio,
                    interest: selectedInterests
                })
                .then(function (response) {
                    // handle success
                    console.log(response);
                    
                    storeData(JSON.stringify(response.data))
    
                }).catch(function (err) {
                    console.log(err);
                    setBioError("There was an error, try again.")
                });
            }else{
                // register if user is a mentor
                axios.post(`${BaseURL}editmentor`, {
                    first: formData.first,
                    last: formData.last,
                    email: formData.email.toLowerCase(),
                    college: formData.college,
                    major: formData.major,
                    complete: true,
                    bio: formData.bio,
                    interest: selectedInterests
                })
                .then(function (response) {
                    // handle success
                    console.log(response);
                    
                    storeData(JSON.stringify(response.data))
    
                }).catch(function (err) {
                    console.log(err.message);
                    setBioError("There was an error, try again.")
                });
            }

        }
      }

      //   store user locally for easy access
      const storeData = async (value) => {
        try {
            console.log(value)
            await localStorage.setItem("user", value);
            window.location.reload()
            console.log("stored data")
        } catch (e) {
            // saving error
            console.log(e.message)
        }
      }


      //   logout user
      const logoutUser = () => {
        console.log("logging out")
        localStorage.clear();
        window.location.reload()
        
      }

      //   delete user
      const deleteProfile = async () => {
        console.log("delete")

        axios.post(`${BaseURL}deleteUser`, {
            email: formData.email.toLowerCase(),
            _id: thisId
        })
        .then(function (response) {
            // handle success
            console.log(response);
            
            localStorage.clear();
            window.location.reload()

        }).catch(function (err) {
            console.log(err.message);
            setBioError("There was an error, try again.")
        });
      }

  return (
    <div>
        {isLoggedIn?

            <div className='standard_bg'>
                {!isComplete?
                    <div>
                        {isStudent?
                        <div>
                            <h1 className='standard_heading3'>YOUR PROFILE IS NOT YET COMPLETE. TO CONNECT WITH MENTORS, PLEASE COMPLETE YOUR PROFILE.</h1>
                        </div>
                        :
                        <div>
                            <h1 className='standard_heading3'>YOUR PROFILE IS NOT YET COMPLETE. TO CONNECT WITH STUDENTS, PLEASE COMPLETE YOUR PROFILE.</h1>
                        </div>
                        }
                    </div>
                    
                    :null
                }

                {isEditing?
                    <div>
                        <h1 className='standard_heading3'>EDIT PROFILE</h1>
                        <form className='form_main' onSubmit={handleSubmit}>
                            <div className='form_row'>
                                <div className='form_item'>
                                    <p>FIRST NAME:<span class="required">*</span></p>
                                    <input name="fist" placeholder='first name' value={formData.first} onChange={handleChange}/>
                                    <p className='error_msg'>{firstError}</p>
                                </div>
                                <div className='form_item'>
                                    <p>LAST NAME:<span class="required">*</span></p>
                                    <input name="last" placeholder='last name' value={formData.last} onChange={handleChange}/>
                                    <p className='error_msg'>{lastError}</p>
                                </div>
                            </div>
                            {/* <div className='form_row'>
                                <div className='form_item'>
                                    <p>EMAIL:<span class="required">*</span></p>
                                    <input name="email" placeholder='email' value={formData.email} onChange={handleChange}/>
                                    <p className='error_msg'>{emailError}</p>
                                </div>
                            </div> */}
                            {isStudent?
                                <div className='form_row'>
                                    <div className='form_item'>
                                        <p>GRADE LEVEL:<span class="required">*</span></p>
                                        <input name="grade" placeholder='grade' value={formData.grade} onChange={handleChange}/>
                                        <p className='error_msg'>{gradeError}</p>
                                    </div>
                                </div>:
                                <div className='form_row'>
                                    <div className='form_item'>
                                        <p>COLLEGE:<span class="required">*</span></p>
                                        <input name="college" placeholder='college attended' value={formData.college} onChange={handleChange}/>
                                        <p className='error_msg'>{collegeError}</p>
                                    </div>
                                    <div className='form_item'>
                                        <p>COLLEGE MAJOR:<span class="required">*</span></p>
                                        <input name="major" placeholder='major' value={formData.major} onChange={handleChange}/>
                                        <p className='error_msg'>{majorError}</p>
                                    </div>
                                </div>
                            }

                            <div className='form_row'>
                                <div className='form_item'>
                                    <p>PERSONAL BIO:</p>
                                    <textarea name="bio" placeholder='your personal bio' value={formData.bio} onChange={handleChange} style={{"min-height":100, "width":"100%"}}/>
                                    <p className='error_msg'>{bioError}</p>
                                </div>
                            </div>

                            <div className='form_row'>
                                <div className='form_item'>
                                <p>SKILLS & INTERESTS:</p>
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

                            <button type="submit" className='basic_button'>SAVE DETAILS</button>
                        </form>
                    </div>
                    :<div>
                        <h1 className='standard_heading4'>{"Welcome back, " + formData.first + " " + formData.last}</h1>

                        <button className='logoutBtn' onClick={logoutUser}>LOGOUT</button>
                        <button className='deleteBtn' onClick={() => { if (window.confirm('Are you sure you wish to delete your profile?')) deleteProfile() }}>DELETE PROFILE</button>
                        <br></br>
                        <button onClick={()=>setIsEditing(true)} className='basic_button editBtn'>EDIT PROFILE</button>

                        <div className='profile_data'>
                            <p className='standard_paragraph'>Email Adress:</p>
                            <h1 className='standard_heading3'>{formData.email}</h1>

                            {isStudent?
                                <div>
                                    <p className='standard_paragraph'>High School Grade:</p>
                                    <h1 className='standard_heading3'>{formData.grade}</h1>
                                </div>
                                :
                                <div>
                                    <p className='standard_paragraph'>College Attended:</p>
                                    <h1 className='standard_heading3'>{formData.college}</h1>
                                    <p className='standard_paragraph'>College Major:</p>
                                    <h1 className='standard_heading3'>{formData.major}</h1>
                                </div>
                            }

                            <p className='standard_paragraph'>About Me:</p>
                            <h1 className='standard_heading3'>{formData.bio}</h1>

                            <p className='standard_paragraph'>My Interests:</p>

                            {selectedOptions.map(function(data) {
                            return (
                                <div className='interestOptions'>
                                    {data.label}
                                </div>
                            )
                            })}
                        </div>

                        
                    </div>
                
                }
            </div>

            :
            // if user is not logged in, direct them to login to the website
            <div className='standard_bg'>
                <div id='main_txt'>
                    <h1 className='standard_heading'>Please Login to Proceed</h1>
                    <a className='standard_btn' href={"/conantconnect/login"}>LOGIN HERE</a>
                </div>
            </div>
        
        }
    </div>
    
  )
}