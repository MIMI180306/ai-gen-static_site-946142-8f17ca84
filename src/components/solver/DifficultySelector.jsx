import React from 'react'
import './DifficultySelector.css'

const DifficultySelector = ({ difficulty, onDifficultyChange }) => {
  const difficulties = [
    { value: 'easy', label: '简单', icon: '😊', color: '#4ade80' },
    { value: 'medium', label: '中等', icon: '🤔', color: '#f59e0b' },
    { value: 'hard', label: '困难', icon: '🧠', color: '#ef4444' }
  ]

  return (
    <div className="difficulty-selector">
      <div className="selector-header">
        <h3>选择难度级别</h3>
        <p className="selector-description">
          根据难度级别，系统会调整解题步骤的详细程度
        </p>
      </div>
      
      <div className="difficulty-buttons">
        {difficulties.map((diff) => (
          <button
            key={diff.value}
            className={`difficulty-button ${difficulty === diff.value ? 'active' : ''}`}
            onClick={() => onDifficultyChange(diff.value)}
            style={{
              '--button-color': diff.color
            }}
          >
            <span className="difficulty-icon">{diff.icon}</span>
            <span className="difficulty-label">{diff.label}</span>
            {difficulty === diff.value && (
              <span className="active-indicator">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DifficultySelector