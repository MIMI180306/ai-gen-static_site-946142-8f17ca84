import React from 'react'
import './Hero.css'

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">你好，我是 <span className="highlight">张三</span></h1>
        <p className="hero-subtitle">全栈开发者 | 创意编程 | 问题解决者</p>
        <p className="hero-description">
          我热衷于构建优雅的用户界面和强大的后端系统。通过代码将创意变为现实，让技术为生活服务。
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
            查看作品
          </button>
          <button className="btn btn-secondary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            联系我
          </button>
        </div>
      </div>
      <div className="hero-image">
        <div className="image-placeholder">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="var(--primary-color)" opacity="0.2"/>
            <circle cx="100" cy="100" r="60" fill="var(--secondary-color)" opacity="0.3"/>
            <circle cx="100" cy="100" r="40" fill="var(--primary-color)" opacity="0.4"/>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero