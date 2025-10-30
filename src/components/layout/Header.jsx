import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">∑</span>
          <h1>Math Problem Solver</h1>
        </div>
        <p className="tagline">Step-by-step solutions for all difficulty levels</p>
      </div>
    </header>
  )
}

export default Header