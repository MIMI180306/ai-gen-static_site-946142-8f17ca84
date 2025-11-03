import React from 'react'
import './Skills.css'

function Skills() {
  const skillCategories = [
    {
      title: '前端开发',
      skills: [
        { name: 'React', level: 90 },
        { name: 'JavaScript/TypeScript', level: 85 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Vue.js', level: 80 }
      ]
    },
    {
      title: '后端开发',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Database', level: 75 },
        { name: 'API设计', level: 85 }
      ]
    },
    {
      title: '工具与其他',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'CI/CD', level: 70 },
        { name: 'AWS/云服务', level: 75 }
      ]
    }
  ]

  return (
    <section id="skills" className="skills">
      <h2 className="section-title">技能专长</h2>
      <div className="skills-container">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3>{category.title}</h3>
            <div className="skills-list">
              {category.skills.map((skill, idx) => (
                <div key={idx} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills