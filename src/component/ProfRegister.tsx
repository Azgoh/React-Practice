/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import './ProfRegister.css';
import type { ProfessionalRegisterDto } from '../interface/ProfessionalRegisterDto';
import { API_BASE_URL } from '../config/Config';
import axios from 'axios';
import Header from './Header';
import type { ErrorResponseDto } from '../interface/ErrorResponseDto';

export default function ProfRegister() {

  const [formData, setFormData] = useState<ProfessionalRegisterDto>({
    fullName: '',
    profession: '',
    location: '',
    description: '',
    phone: ''
  });

  const [error, setError] = useState<ErrorResponseDto>({
    message: '',
    status: 0,
    timestamp: new Date(),
  });

  const handleChange= (e: React.ChangeEvent<HTMLInputElement>): void => {
     const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();
      const jwt = sessionStorage.getItem("jwt");
      try{
        const response = await axios.post(`${API_BASE_URL}/professionals/register`
          ,formData
          , {headers: { 'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
          }}
        )

        console.log(response.data);
      } catch (err: any){
          const backendError: ErrorResponseDto = JSON.parse(err.request.response || '{}');
          setError(backendError);
          console.error(error)
      }
  }

  return (
    <div className='prof-register-wrapper'>
      <Header shownav={false}></Header>
      <form onSubmit={handleSubmit} className='prof-register-form'>
          <h1 className='prof-register-h1'>Register as a Professional</h1>
          <h3 className='prof-register-h3'>Your Full Name</h3>
          <input name='fullName' placeholder='Full Name' value={formData.fullName} onChange={handleChange} required className='prof-register-input'/>
          <h3 className='prof-register-h3'>Your Profession</h3>
          <input name='profession' placeholder='Profession' value={formData.profession} onChange={handleChange} required className='prof-register-input'/>
          <h3 className='prof-register-h3'>Your Location</h3>
          <input name='location' placeholder='Location' value={formData.location} onChange={handleChange} required className='prof-register-input'/>
          <h3 className='prof-register-h3'>Add a Short Description</h3>
          <input name='description' placeholder='Description' value={formData.description} onChange={handleChange} className='prof-register-input'/>
          <h3 className='prof-register-h3'>Your Phone Number</h3>
          <input name='phone' placeholder='Phone Number' value={formData.phone} onChange={handleChange} required className='prof-register-input'/>
          <button className='prof-register-btn' type='submit' disabled={false}>Register as a Professional</button>
          {error && <p style={{color: 'red'}}>{error.message}</p>} 
      </form>
      {/* {message && <p style={{color: 'green'}}>{message}</p>} */}
    </div>
  )
}
