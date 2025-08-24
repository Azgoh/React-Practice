/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';
import axios from 'axios';
import { API_BASE_URL } from '../config/Config';
import type { ProfessionalProfile } from '../interface/ProfessionalProfile';
import { FaTimes } from 'react-icons/fa';

export const SearchBar = () => {

    const [input, setInput] = useState<string>("");
    const [professionals, setProfessionals] = useState<ProfessionalProfile[]>([]);
    const [filtered, setFiltered] = useState<ProfessionalProfile[]>([]);
    const [focused, setFocused] = useState<boolean>(false); 

    useEffect(() => {
        const getProfessionals = async (): Promise<void> => {
            try{
                const res = await axios.get<ProfessionalProfile[]>(`${API_BASE_URL}/professionals`);
                setProfessionals(res.data);
                setFiltered(res.data);
            } catch (err){
                console.error(err);
            }
        };
        getProfessionals();
    }, [])

    // useEffect(() => {
    //     if(input === ""){
    //         setFiltered([]);
    //         return;
    //     }
    // }, [input])

    useEffect(() => {
        const lowerInput = input.toLowerCase();
        const filteredProfs = professionals.filter(
            (prof) =>  
                prof.profession.toLowerCase().includes(lowerInput)      
        );

        setFiltered(filteredProfs);
    }, [input, professionals]);

    const handleSelectProf = (prof: ProfessionalProfile): void => {
        setInput(`${prof.profession}`);
        setFocused(false);
    }

    const clearInput = (): void => {
        setInput("");
    }

    return (
        <div className='input-wrapper'>
            <FaSearch id='search-icon'/>
            <input className='search-input'
            placeholder='Search for a professional' 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            /> <FaTimes className='clear-icon' onClick={clearInput}/>
            {focused && filtered.length > 0 && (
                <div className='search-results'>
                {filtered.map((prof) => (
                <div key={prof.id} className='result-item' onClick={() => handleSelectProf(prof)}>
                    <strong>{prof.profession}</strong>
                </div>
            ))}
            </div>
            )}
        </div>
        
    )
}
