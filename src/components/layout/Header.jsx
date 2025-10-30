import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">∑</span>
          <h1>数学题解答器123</h1>
        </div>
        <p className="tagline">Step-by-step solutions for every math problem</p>
      </div>
    </header>
  )
}

export default Header