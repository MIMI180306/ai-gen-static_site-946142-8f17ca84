import React from 'react'
import './About.css'

function About() {
  return (
    <section id="about" className="about">
      <h2 className="section-title">关于我</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            我是一名充满热情的全栈开发者，拥有超过5年的软件开发经验。我专注于创建用户友好、性能卓越的Web应用程序。
          </p>
          <p>
            我的技术栈包括现代JavaScript框架、后端开发以及云服务部署。我始终保持学习的热情，紧跟技术发展的步伐。
          </p>
          <p>
            除了编程，我还热爱开源社区，经常参与各种开源项目的贡献。我相信通过分享知识和协作，我们可以共同创造更好的软件。
          </p>
        </div>
        <div className="about-stats">
          <div className="stat-card">
            <h3>5+</h3>
            <p>年工作经验</p>
          </div>
          <div className="stat-card">
            <h3>50+</h3>
            <p>完成项目</p>
          </div>
          <div className="stat-card">
            <h3>30+</h3>
            <p>满意客户</p>
          </div>
          <div className="stat-card">
            <h3>100%</h3>
            <p>项目成功率</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About