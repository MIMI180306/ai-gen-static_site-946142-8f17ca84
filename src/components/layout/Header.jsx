import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">🧮 数学题解答器</h1>
        <p className="header-subtitle">输入数学问题，获取详细的分步解答</p>
      </div>
    </header>
  )
}

export default Header