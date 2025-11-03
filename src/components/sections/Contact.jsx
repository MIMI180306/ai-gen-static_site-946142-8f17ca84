import React, { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 这里可以添加实际的表单提交逻辑
    console.log('表单数据:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <section id="contact" className="contact">
      <h2 className="section-title">联系我</h2>
      <div className="contact-container">
        <div className="contact-info">
          <h3>让我们一起合作</h3>
          <p>如果您有任何项目想法或合作机会，欢迎随时联系我。我很乐意倾听您的想法并探讨如何帮助您实现目标。</p>
          
          <div className="contact-details">
            <div className="contact-item">
              <span className="icon">📧</span>
              <div>
                <h4>邮箱</h4>
                <p>contact@example.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="icon">📱</span>
              <div>
                <h4>电话</h4>
                <p>+86 138 0000 0000</p>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="icon">📍</span>
              <div>
                <h4>位置</h4>
                <p>中国 · 北京</p>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {submitted && (
            <div className="success-message">
              感谢您的留言！我会尽快回复您。
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="name">姓名</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="请输入您的姓名"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">邮箱</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">主题</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="留言主题"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">留言</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="请输入您的留言内容..."
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            发送消息
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact