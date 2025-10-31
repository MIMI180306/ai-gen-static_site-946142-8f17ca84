import React from 'react'
import './DifficultySelector.css'

const DifficultySelector = ({ difficulty, onSelect }) => {
  const levels = [
    { value: 'easy', label: '简单', icon: '🟢', desc: '基础步骤' },
    { value: 'medium', label: '中等', icon: '🟡', desc: '详细解释' },
    { value: 'hard', label: '困难', icon: '🔴', desc: '完整推导' }
  ]

  return (
    <div className="difficulty-selector">
      <h3 className="selector-title">选择难度级别</h3>
      <div className="difficulty-buttons">
        {levels.map(level => (
          <button
            key={level.value}
            className={`difficulty-btn ${difficulty === level.value ? 'active' : ''}`}
            onClick={() => onSelect(level.value)}
          >
            <span className="difficulty-icon">{level.icon}</span>
            <div className="difficulty-info">
              <span className="difficulty-label">{level.label}</span>
              <span className="difficulty-desc">{level.desc}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DifficultySelector