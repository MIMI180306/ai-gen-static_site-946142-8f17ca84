import React from 'react'
import './DifficultySelector.css'

function DifficultySelector({ difficulty, onDifficultyChange }) {
  const levels = [
    { value: 'easy', label: 'Easy', icon: '😊', description: 'Simple explanations' },
    { value: 'medium', label: 'Medium', icon: '🤔', description: 'Detailed steps' },
    { value: 'hard', label: 'Hard', icon: '🧠', description: 'In-depth analysis' }
  ]

  return (
    <div className="difficulty-selector">
      <label className="difficulty-label">Difficulty Level:</label>
      <div className="difficulty-options">
        {levels.map(level => (
          <button
            key={level.value}
            className={`difficulty-btn ${difficulty === level.value ? 'active' : ''}`}
            onClick={() => onDifficultyChange(level.value)}
          >
            <span className="difficulty-icon">{level.icon}</span>
            <span className="difficulty-text">
              <strong>{level.label}</strong>
              <small>{level.description}</small>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DifficultySelector