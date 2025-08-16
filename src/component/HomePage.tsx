import React from 'react'
import { SearchBar } from './SearchBar';
import './HomePage.css';
import Header from './Header';
import { FaLightbulb } from "react-icons/fa";

function HomePage(){

    return(
        <div className='home-page-container'>

            <header className='header-container'>
                <Header/>
            </header>

            <div className='search-bar-container'>
                <div className="search-heading">
                     <FaLightbulb style={{ marginRight: "0.5rem" }} />Expert solutions for you
                </div>
                <SearchBar/>
            </div>

            <footer className='footer-container'>
                Footer
            </footer>
        </div>
    )

}; 

export default HomePage;
