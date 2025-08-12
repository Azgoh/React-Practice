/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import type { LoginRequestDto } from '../interface/LoginRequestDto';
import axios from 'axios';
import { API_BASE_URL, OAUTH2_BASE_URL } from '../config/Config';
import * as FaIcons from 'react-icons/fa';
import './LoginForm.css'
import { Button, Divider, Typography } from '@mui/material';
import { GoogleIcon } from '../icons/CustomIcons';
import { Link, useNavigate } from 'react-router-dom';


function LoginForm(){

    const [formData, setFormData] = useState<LoginRequestDto>({
            identifier: '',
            password: ''
        });

    const [identifierError, setIdentifierError] = useState<string | null>(null);

    const [passwordError, setPasswordError] = useState<string | null>(null);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);

    const passwordRegex = /^[a-zA-Z0-9]{8,30}$/;

    const passwordErrorMessage: string = "Password must be between 8-30 characters, only numbers and letters";

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setError(null);

        try{
            const response = await axios.post<string>(`${API_BASE_URL}/login`, formData,
                {headers: { 'Content-Type': 'application/json' }}
            );
            const jwt_token: string = response.data;
            sessionStorage.setItem("jwt", jwt_token); // cookie approach (?)
            navigate("/home");
        } catch(err: any){
            console.error(err.response);
            if(err.response?.data?.message){
                setError(err.response.data.message);
            } else {
                setError("Log in failed. Please try again");
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        setError(null);

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
    }

    const isFormValid = (): boolean => {
        return isPasswordValid;
    }

 
    return(
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Log in to continue</h1>
                <input name='identifier' placeholder='Username or email' value={formData.identifier} onChange={handleChange} required/>
                <div className='password-container'>
                     <input name='password' type={showPassword ? 'text' : 'password'} 
                     placeholder='Password' value={formData.password} onChange={handleChange} autoComplete='new-password' required/>
                     <span
                     onClick={togglePasswordVisibility}>
                     {showPassword ? <FaIcons.FaEyeSlash/> : <FaIcons.FaEye/>}
                     </span>
                </div> 
                {passwordError && <p>{passwordError}</p>} 
                <button className='login-btn' type='submit' disabled={!isFormValid()}>Log in</button>
                <Divider>
                    <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                </Divider>
                <Button
                fullWidth
                variant="outlined"
                onClick={() => { window.location.href = `${OAUTH2_BASE_URL}`;}}
                startIcon={<GoogleIcon />}
                >
                Continue with Google
                </Button>
            </form>
            <Typography sx={{ textAlign: 'center' }} className='register_typography'>
                Don't have an account?{' '}
                <Link
                to="/register"
                className='register_link'
                >
                Sign up
                </Link>
            </Typography>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    )
};

export default LoginForm;