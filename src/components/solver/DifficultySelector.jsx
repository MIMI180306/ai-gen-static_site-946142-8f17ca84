import React from 'react'
import './DifficultySelector.css'

const DifficultySelector = ({ difficulty, onDifficultyChange }) => {
  const difficulties = [
    { value: 'easy', label: 'Easy', description: 'Basic steps' },
    { value: 'medium', label: 'Medium', description: 'Standard explanation' },
    { value: 'hard', label: 'Hard', description: 'Detailed breakdown' }
  ]

  return (
    <div className="difficulty-selector">
      <label className="selector-label">Difficulty Level:</label>
      <div className="difficulty-options">
        {difficulties.map((diff) => (
          <button
            key={diff.value}
            className={`difficulty-btn ${difficulty === diff.value ? 'active' : ''}`}
            onClick={() => onDifficultyChange(diff.value)}
          >
            <span className="diff-label">{diff.label}</span>
            <span className="diff-description">{diff.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DifficultySelector