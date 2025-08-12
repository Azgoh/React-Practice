/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import axios from 'axios';
import type { RegisterRequestDto } from '../interface/RegisterRequestDto';
import * as FaIcons from 'react-icons/fa';
import './SignUpForm.css';
import { Link } from 'react-router-dom';
import { GoogleIcon } from '../icons/CustomIcons';
import { Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function SignUpForm() {

    const [formData, setFormData] = useState<RegisterRequestDto>({
        username: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [usernameError, setUsernameError] = useState<string | null>(null);

    const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);

    const [emailError, setEmailError] = useState<string | null>(null);

    const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

    const [passwordError, setPasswordError] = useState<string | null>(null);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

    const passwordRegex = /^[a-zA-Z0-9]{8,30}$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordErrorMessage: string = "Password must be between 8-30 characters, only numbers and letters";

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        if(name === "username"){
            if(value.length < 5 && value.length > 0){
                setUsernameError("Username must be at least 5 characters");
                setIsUsernameValid(false);
            }else{
                setUsernameError(null);
                setIsUsernameValid(true);
            }
        }

        if(name === "email"){
            if(!emailRegex.test(value) && value.length > 0){
                setEmailError("Please enter a valid email address");
                setIsEmailValid(false);
            }else if (value.length == 0){
                setEmailError(null);
                setIsEmailValid(false);
            } else {
                setEmailError(null);
                setIsEmailValid(true);
            }
        }

        if(name === "password"){
            if(value.length > 0 && !passwordRegex.test(value)){
                setPasswordError(passwordErrorMessage);
                setIsPasswordValid(false);
            } else if(value.length == 0){
                setIsPasswordValid(false);
                setPasswordError(null);
            } else {
                setIsPasswordValid(true);
                setPasswordError(null);
            }
        }
    };

    const isFormValid = (): boolean=> {
        return isUsernameValid && isEmailValid && isPasswordValid;
    }

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try{
            const response = await axios.post<string>('http://localhost:8080/api/register', formData,
                {headers: { 'Content-Type': 'application/json' }}
            );
            setMessage(response.data);
            navigate("/login");

        } catch (err: any){
            if(err.response?.data?.message){
                setError(err.response.data.message);
            } else {
                setError("Registration failed. Please try again");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return(
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <h3>Sign up to continue</h3>
                <input name='username' placeholder='Username' value={formData.username} onChange={handleChange} required/>
                {usernameError && <p>{usernameError}</p>}
                <input name='email' type='email' placeholder='Email' value={formData.email} onChange={handleChange} required/>
                {emailError &&  <p>{emailError}</p>}
                <div className='password-container'>
                    <input name='password' type={showPassword ? 'text' : 'password'} 
                    placeholder='Password' value={formData.password} onChange={handleChange} autoComplete='new-password' required/>
                    <span
                    onClick={togglePasswordVisibility}>
                    {showPassword ? <FaIcons.FaEyeSlash/> : <FaIcons.FaEye/>}
                    </span>
                </div>  
                {passwordError && <p>{passwordError}</p>}
                <button className='register-btn' type='submit' disabled={!isFormValid()}>Sign up</button>
                <Divider>
                    <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                </Divider>
                <Button
                fullWidth
                variant="outlined"
                onClick={() => { window.location.href = 'http://localhost:8080/oauth2/authorization/google';}}
                startIcon={<GoogleIcon />}
                >
                Sign up with Google
                </Button>
            </form>
            <Typography sx={{ textAlign: 'center' }} className='login_typography'>
                Already have an account?{' '}
                <Link
                to="/login"
                className='login_link'
                >
                Sign in
                </Link>
            </Typography>
            {message && <p style={{color: 'green'}}>{message}</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    )
}

export default SignUpForm;
