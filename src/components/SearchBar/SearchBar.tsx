import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';
import { FaTimes } from 'react-icons/fa';

/** Props for the SearchBar component */
interface SearchBarProps {
  /** Current input value */
  value: string;
  /** Callback fired when input value changes */
  onChange: (val: string) => void;
  /** Optional test identifier for E2E testing */
  "data-test"?: string;
}

/**
 * SearchBar Component
 * Provides a search input field with clear functionality.
 * Features a search icon on the left and a clear button when text is entered.
 */
export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, "data-test": dataTest }) => {
    // Manage focus state for the input field (currently unused but preserved for future enhancements)
    const [, setFocused] = useState(false);

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
                data-test={dataTest}
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
