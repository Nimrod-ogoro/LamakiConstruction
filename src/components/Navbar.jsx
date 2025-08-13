import React, { useState } from 'react'
import  Button  from './ui/Button';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen]= useState(false);
    const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  setIsMenuOpen(false);
};

  return (
   <nav className='navbar'>
     <div className='logo-container'>
      <img src="logo.png" alt="Logo" className="logo" />
      <h1 className='title'>Lamaki Designs</h1>
    </div>

    {/*Desktop Navigation*/}
    <div className='desktop-nav '>
        <Button
          variant='cta' size='sm'>
            Get Quote
            
          </Button>
        
        <button
        onClick={()=> scrollToSection('about')}
        className='nav-button'>About
        </button>
        <button
        onClick={()=> scrollToSection('services')}      
        className='nav-button'>Services
        </button>
        <button
        onClick={()=> scrollToSection('contact')}
        className='nav-button'>Contact  
        </button>
        <button
        onClick={()=> scrollToSection('projects')}
        className='nav-button'>Projects
        </button>
        <button
        onClick={()=> scrollToSection('Merchandise')}
        className='nav-button'>Merchandise
        </button>
        <button
        onClick={()=> scrollToSection('Gallary')}
        className='nav-button'>Gallery
        </button>
        

    </div>
    {/*Mobile Navigation*/}
    {isMenuOpen && (
      <div className='mobile-nav'>
        <button
          onClick={() => scrollToSection('about')}
          className='nav-button'>About
        </button>
        <button
          onClick={() => scrollToSection('services')}
          className='nav-button'>Services
        </button>
        <button
          onClick={() => scrollToSection('contact')}
          className='nav-button'>Contact  
        </button>
        <button
          onClick={() => scrollToSection('projects')}
          className='nav-button'>Projects
        </button>
        <button
          onClick={() => scrollToSection('Merchandise')}
          className='nav-button'>Merchandise
        </button>
      </div>
    )}
   </nav>
  )
}

export default Navbar
