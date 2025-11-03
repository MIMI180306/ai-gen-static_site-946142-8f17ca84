import React from 'react'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>关于我</h3>
            <p>一位充满热情的开发者，致力于创造优秀的数字体验。</p>
          </div>
          
          <div className="footer-section">
            <h3>快速链接</h3>
            <ul>
              <li><a href="#hero">首页</a></li>
              <li><a href="#about">关于</a></li>
              <li><a href="#projects">项目</a></li>
              <li><a href="#contact">联系</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>社交媒体</h3>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} 版权所有。保留所有权利。</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer