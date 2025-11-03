import React, { useState } from 'react'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>我的作品集</h1>
        </div>
        
        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="切换菜单"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a onClick={() => scrollToSection('hero')}>首页123</a></li>
            <li><a onClick={() => scrollToSection('about')}>关于</a></li>
            <li><a onClick={() => scrollToSection('skills')}>技能</a></li>
            <li><a onClick={() => scrollToSection('projects')}>项目</a></li>
            <li><a onClick={() => scrollToSection('contact')}>联系</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header