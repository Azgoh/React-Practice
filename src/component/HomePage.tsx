import React from 'react'
import { SearchBar } from './SearchBar';
import './HomePage.css';

function HomePage(){

    return(
        <div className='home-page-container'>

            <header className='header-container'>
                Header
            </header>

            <div className='search-bar-container'>
                <SearchBar/>
            </div>

            <aside className='side-nav-container'>
                Side nav
            </aside>

            <footer className='footer-container'>
                Footer
            </footer>
        </div>
    )

}; 

export default HomePage;
