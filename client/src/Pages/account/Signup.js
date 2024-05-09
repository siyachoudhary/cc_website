import React, { useState } from 'react'
import './Login.css'
import axios from "axios";
import { BaseURL } from '../BaseUrl';
import { useNavigate } from "react-router-dom";

export default function Signup() {

    const [isStudent, setIsStudent] = useState(true);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first: '',
        last: '',
        email: '',
        password: '',
        confirm: '',
        // college: '',
        // major: '',
        grade:''
      });

      const [firstError, setFirstError] = useState("");
      const [lastError, setLastError] = useState("");
      const [emailError, setEmailError] = useState("");
      const [passwordError, setPasswordError] = useState("");
      const [confirmError, setConfirmError] = useState("");
    //   const [collegeError, setcollegeError] = useState("");
    //   const [majorError, setMajorError] = useState("");
      const [gradeError, setGradeError] = useState("");

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };

    //   handle submit for sign up form
      const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        setFirstError("")
        setLastError("")
        setEmailError("")
        setPasswordError("")
        setConfirmError("")
        // setcollegeError("")
        // setMajorError("")
        setGradeError("")

        var noErrors = true
    
        // Here you can handle the submission by sending the form data to a server
        console.log('Form Data:', formData);

        if (formData.email.includes(' ')) {
            setEmailError("Email cannot include spaces")
            noErrors = false
        }
        if(formData.password.includes(" ")){
            setPasswordError("Password cannot include spaces")
            noErrors = false
        }
        if(formData.confirm.includes(" ")){
            setConfirmError("Password cannot include spaces")
            noErrors = false
        }

        // validations to ensure all the data entered is good 
        if(formData.first.length==0){
            setFirstError("Please enter your first name")
            noErrors = false
        }
        if(formData.last.length==0){
            setLastError("Please enter your last name")
            noErrors = false
        }
        if(formData.email.length==0){
            setEmailError("Please enter your email")
            noErrors = false
        }else{
            if(!formData.email.includes("@") && !formData.email.includes(".")){
                setEmailError("Please enter a valid email")
                noErrors = false
            }
        }
        if(formData.password.length==0){
            setPasswordError("Please enter your password")
            noErrors = false
        }else{
            if(formData.password.length<6){
                setPasswordError("Password must be at least 6 characters")
                noErrors=false
            }
        }
        if(formData.confirm.length==0){
            setConfirmError("Please enter your password again")
            noErrors = false
        }else{
            if(formData.confirm!=formData.password){
                setConfirmError("Passwords do not match")
                noErrors = false
            }
        }
        if(isStudent){
            if(formData.grade.length==0){
                setGradeError("Please enter your high school grade level")
                noErrors = false
            }
        }else{
            // if(formData.college.length==0){
            //     setcollegeError("Please enter your college name")
            //     noErrors = false
            // }
            // if(formData.major.length==0){
            //     setMajorError("Please enter your college major")
            //     noErrors = false
            // }
        }
        
        
        if(noErrors){
            if(isStudent){
                // register if user is a student
                axios.post(`${BaseURL}registerstudent`, {
                    first: formData.first,
                    last: formData.last,
                    email: formData.email.toLowerCase(),
                    password: formData.password,
                    grade: formData.grade,
                    type: "student",
                    complete: false
                })
                .then(function (response) {
                    // handle success
                    console.log(response);
                    
                    storeData(JSON.stringify(response.data))
    
                }).catch(function (err) {
                    console.log(err);
                    setEmailError("Email is taken, try again with a new email")
                });
            }else{
                // register if user is a mentor
                axios.post(`${BaseURL}registermentor`, {
                    first: formData.first,
                    last: formData.last,
                    email: formData.email.toLowerCase(),
                    password: formData.password,
                    // college: formData.college,
                    // major: formData.major,
                    type: "mentor",
                    complete: false
                })
                .then(function (response) {
                    // handle success
                    console.log(response);
                    
                    storeData(JSON.stringify(response.data))
    
                }).catch(function (err) {
                    console.log(err.message);
                    setEmailError("Email is taken, try again with a new email")
                });
            }
        }
      };

    //   store user locally for easy access
      const storeData = async (value) => {
        try {
            console.log(value)
            await localStorage.setItem("user", value);
            if(!isStudent){
                navigate("/home")
            }else{
                navigate("/profile")
            }
            window.location.reload()
            console.log("stored data")
        } catch (e) {
            // saving error
            console.log(e.message)
        }
      }

  return (
    <div className='standard_bg'>
        <h1 className='standard_heading2'>SIGN UP</h1>
        {isStudent?
            <div>
                <a className='standard_btn selected' onClick={() =>setIsStudent(true)}>STUDENT</a>
                <a className='standard_btn not_selected' onClick={() =>setIsStudent(false)}>MENTOR</a>
            </div>:
            <div>
                <a className='standard_btn not_selected' onClick={() =>setIsStudent(true)}>STUDENT</a>
                <a className='standard_btn selected' onClick={() =>setIsStudent(false)}>MENTOR</a>
            </div>
        }

        {/* signup form */}
        <form className='form_main' onSubmit={handleSubmit}>
            <div className='form_row'>
                <div className='form_item'>
                    <p>FIRST NAME:<span class="required">*</span></p>
                    <input name="first" placeholder='first name' value={formData.first}
          onChange={handleChange}/>
                    <p className='error_msg'>{firstError}</p>
                </div>
                <div className='form_item'>
                    <p>LAST NAME:<span class="required">*</span></p>
                    <input name="last" placeholder='last name' value={formData.last}
          onChange={handleChange}/>
                    <p className='error_msg'>{lastError}</p>
                </div>
            </div>
            <div className='form_row'>
                <div className='form_item'>
                    <p>EMAIL:<span class="required">*</span></p>
                    <input name="email" placeholder='email' value={formData.email}
          onChange={handleChange}/>
                    <p className='error_msg'>{emailError}</p>
                </div>
            </div>
            <div className='form_row'>
                <div className='form_item'>
                    <p>PASSWORD:<span class="required">*</span></p>
                    <input name="password" type='password' placeholder='password' value={formData.password}
          onChange={handleChange}/>
                    <p className='error_msg'>{passwordError}</p>
                </div>
                <div className='form_item'>
                    <p>CONFIRM PASSWORD:<span class="required">*</span></p>
                    <input name="confirm" type='password' placeholder='confirm password' value={formData.confirm}
          onChange={handleChange}/>
                    <p className='error_msg'>{confirmError}</p>
                </div>
            </div>
            {isStudent?
            
                <div className='form_row'>
                    <div className='form_item'>
                        <p>GRADE LEVEL:<span class="required">*</span></p>
                        <input name="grade" placeholder='high school grade level' value={formData.grade}
            onChange={handleChange}/>
                        <p className='error_msg'>{gradeError}</p>
                    </div>
                </div>:null

            //     <div className='form_row'>
            //         <div className='form_item'>
            //             <p>COLLEGE:</p>
            //             <input name="college" placeholder='college/university' value={formData.college}
            // onChange={handleChange}/>
            //             <p className='error_msg'>{collegeError}</p>
            //         </div>
            //         <div className='form_item'>
            //             <p>COLLEGE MAJOR:</p>
            //             <input name="major" placeholder='major' value={formData.major}
            // onChange={handleChange}/>
            //             <p className='error_msg'>{majorError}</p>
            //         </div>
            //     </div>
            }
                <button type="submit" className='basic_button'>CREATE ACCOUNT</button>
        </form>

        <a className='standard_link' href={"/login"}>Already signed up? Login here!</a>
        
    </div>
  )
}