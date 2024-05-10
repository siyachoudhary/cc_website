import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseURL } from '../BaseUrl';

export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });

      const [emailError, setEmailError] = useState("");
      const [passwordError, setPasswordError] = useState("");

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        var noErrors = true
    
        // Here you can handle the submission by sending the form data to a server
        console.log('Form Data:', formData);

        // validations to ensure that data entered is accurate
        if (formData.email.includes(' ')) {
            setEmailError("Email cannot include spaces")
            noErrors = false
        }
        if(formData.password.includes(" ")){
            setPasswordError("Password cannot include spaces")
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
        }

        if(noErrors){
            axios.post(`${BaseURL}login`, {
                email: formData.email.toLowerCase(),
                password: formData.password,
            })
            .then(function (response) {
                // handle success
                console.log(response.data);
                
                storeData(JSON.stringify(response.data))

            }).catch(function (err) {
                console.log(err);
                setPasswordError("Email or password is incorrect. Try again")
            });
        }


      }

    //   store user to local storage for easy access
      const storeData = async (value) => {
        try {
            console.log(value)
            await localStorage.setItem("user", value);
            if(JSON.parse(value).complete==false){
                navigate("/conantconnect/profile")
            }else{
                navigate("/conantconnect/home")
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
        <h1 className='standard_heading2'>Login</h1>

        {/* form for login */}
        <form className='form_main' onSubmit={handleSubmit}>
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
            </div>
            <br></br>
            <a className='standard_link' href={"/conantconnect/forgot"}>Forgot password?</a>
            <br></br>
            <button type="submit" className='basic_button'>Login</button>
        </form>
        <a className='standard_link' href={"/conantconnect/signup"}>Don't have an account? Sign up here!</a>
        
    </div>
  )
}