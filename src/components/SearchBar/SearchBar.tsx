/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';
import { FaTimes } from 'react-icons/fa';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}


export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className='input-wrapper'>
            <FaSearch id='search-icon' />

            <input
                className='search-input'
                placeholder='Search for a profession'
                value={value}
                onChange={(e) => onChange(e.target.value)}   
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
            />

            {value && (
                <FaTimes
                    className='clear-icon'
                    onClick={() => onChange("")}
                />
            )}
        </div>
    );
};
