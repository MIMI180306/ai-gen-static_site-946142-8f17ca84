import React from 'react'
import './Projects.css'

function Projects() {
  const projects = [
    {
      title: '电商平台',
      description: '一个功能完整的电商平台，支持商品浏览、购物车、订单管理等功能。使用React和Node.js构建。',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: '🛒',
      link: '#'
    },
    {
      title: '任务管理系统',
      description: '团队协作的任务管理工具，支持实时更新、权限管理和项目看板功能。',
      technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      image: '📋',
      link: '#'
    },
    {
      title: '天气预报应用',
      description: '实时天气信息查询应用，提供详细的天气数据和未来一周的天气预报。',
      technologies: ['React', 'API集成', 'Chart.js'],
      image: '🌤️',
      link: '#'
    },
    {
      title: '博客平台',
      description: '个人博客系统，支持Markdown编辑、标签分类、评论功能和SEO优化。',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
      image: '📝',
      link: '#'
    },
    {
      title: '在线聊天应用',
      description: '实时通讯应用，支持一对一聊天、群组聊天和文件分享功能。',
      technologies: ['React', 'Socket.io', 'Redis'],
      image: '💬',
      link: '#'
    },
    {
      title: '数据可视化仪表板',
      description: '企业级数据分析仪表板，提供多维度数据展示和交互式图表。',
      technologies: ['React', 'D3.js', 'Python'],
      image: '📊',
      link: '#'
    }
  ]

  return (
    <section id="projects" className="projects">
      <h2 className="section-title">精选项目</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-icon">{project.image}</div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="technologies">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="tech-tag">{tech}</span>
              ))}
            </div>
            <a href={project.link} className="project-link">查看详情 →</a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects