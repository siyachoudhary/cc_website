import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseURL } from '../BaseUrl';

export default function Forgot() {

    const navigate = useNavigate();

    const [OTP, setOTP] = useState(0);

    const [isSubmitted, setIsSubmitted] = useState(false)

    const [isNewPassword, setIsNewPassword] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        OTP:'',
        password:'',
        confirm:''
    });

      const [emailError, setEmailError] = useState("");
      const [OTPError, setOTPError] = useState("");
      const [passwordError, setPasswordError] = useState("");
      const [confirmError, setConfirmError] = useState("");

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };

    //   check and replace old password with new password
      const handlePassword = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        
        var noErrors = true

        // validations
        if(formData.password.includes(" ")){
            setPasswordError("Password cannot include spaces")
            noErrors = false
        }
        if(formData.confirm.includes(" ")){
            setConfirmError("Password cannot include spaces")
            noErrors = false
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

        if(noErrors){
            axios.post(`${BaseURL}resetPassword`, {
                email: formData.email.toLowerCase(),
                password: formData.password,
            })
            .then(function (response) {
                // handle success
                console.log(response);
                
                storeData(JSON.stringify(response.data))

            }).catch(function (err) {
                console.log(err);
                setEmailError("Email is taken, try again with a new email")
            });
        }


      }

        //   store user locally for easy access
        const storeData = async (value) => {
            try {
                console.log(value)
                await localStorage.setItem("user", value);
                navigate("/conantconnect/home")
                window.location.reload()
                console.log("stored data")
            } catch (e) {
                // saving error
                console.log(e.message)
            }
          }

        //   Check if user entered OTP is valid
      const handleOTP = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log(OTP)
        if(OTP == formData.OTP){
            // allow user to input their new password
            setIsNewPassword(true)
        }else{
            setOTPError("Incorrect OTP")
        }

      }

      const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        var noErrors = true
    
        // Here you can handle the submission by sending the form data to a server
        console.log('Form Data:', formData);

        // validations to ensure that data entered is accurate
        if (formData.email.includes(' ')) {
            setEmailError("Email cannot include spaces")
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

        if(noErrors){

            const OTP = Math.floor(Math.random() * 9000 + 1000);
            console.log(OTP);
            setOTP(OTP);

            await axios
            .post(`${BaseURL}send_recovery_email`, {
                OTP,
                recipient_email: formData.email,
            })
            .then(setIsSubmitted(true))
            .catch(function (err) {
                console.log(err);
                setIsSubmitted(false)
                setEmailError("This email does not exist in our records")
            });
            
        }

      }

  return (
    <div className='standard_bg'>
        <h1 className='standard_heading2'>Forgot Password</h1>

        {/* form for login */}
        {
            isSubmitted?

                <div>
                {isNewPassword?
                // If OTP is correct user can change their password with this form
                    <form className='form_main' onSubmit={handlePassword}>
                        <div className='form_row'>
                            <div className='form_item'>
                                <p>New Password:</p>
                                <input name="password" placeholder='password' value={formData.password}
                                    onChange={handleChange} type='password'/>
                                <p className='error_msg'>{passwordError}</p>
                            </div>
                        </div>
                        <div className='form_row'>
                            <div className='form_item'>
                                <p>Confirm Password:</p>
                                <input name="confirm" placeholder='confirm password' value={formData.confirm}
                                    onChange={handleChange} type='password'/>
                                <p className='error_msg'>{confirmError}</p>
                            </div>
                        </div>
                        <button type="submit" className='basic_button'>RESET PASSWORD</button>
                    </form>

                    :

                    // If OTP is sent, user can validate OTP with this form
                    <form className='form_main' onSubmit={handleOTP}>
                        <div className='form_row'>
                            <div className='form_item'>
                                <p>An OTP has been sent to {formData.email}. Enter it here to reset your password:</p>
                                <input name="OTP" placeholder='OTP' value={formData.OTP}
                                    onChange={handleChange}/>
                                <p className='error_msg'>{OTPError}</p>
                            </div>
                        </div>
                        <button type="submit" className='basic_button'>RESET PASSWORD</button>
                        <br></br>
                        <a className='standard_link' onClick={handleSubmit}>Didn't recieve OTP? Send again.</a>
                    </form>

                }
                </div>

            // User will be emailed the OTP with this form
            :<form className='form_main' onSubmit={handleSubmit}>
            <div className='form_row'>
                <div className='form_item'>
                    <p>EMAIL:</p>
                    <input name="email" placeholder='email' value={formData.email}
          onChange={handleChange}/>
                    <p className='error_msg'>{emailError}</p>
                </div>
            </div>
            <button type="submit" className='basic_button'>RESET PASSWORD</button>
            <br></br>
            <a className='standard_link' href={"/conantconnect/signup"}>Don't have an account? Sign up here!</a>
        </form>
        }
        
    </div>
  )
}