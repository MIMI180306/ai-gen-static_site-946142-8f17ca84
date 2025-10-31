import React from 'react'
import './ProblemInput.css'

function ProblemInput({ problem, onProblemChange, onSolve, onClear, error }) {
  const examples = [
    { label: 'Linear Equation', value: '2x + 5 = 13' },
    { label: 'Quadratic Equation', value: 'x^2 - 5x + 6 = 0' },
    { label: 'Fraction', value: '1/2 + 1/3' },
    { label: 'Percentage', value: 'What is 20% of 150?' },
    { label: 'Arithmetic', value: '25 * 4 + 10' }
  ]

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSolve()
    }
  }

  return (
    <div className="problem-input">
      <div className="input-header">
        <label className="input-label">Enter your math problem:</label>
        <div className="example-buttons">
          {examples.map((example, index) => (
            <button
              key={index}
              className="example-btn"
              onClick={() => onProblemChange(example.value)}
              title={`Try: ${example.value}`}
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>
      
      <textarea
        className="problem-textarea"
        value={problem}
        onChange={(e) => onProblemChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Example: 2x + 5 = 13\nOr: What is 20% of 150?\nOr: 1/2 + 1/3"
        rows="4"
      />
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="input-actions">
        <button className="btn btn-primary" onClick={onSolve}>
          🔍 Solve Problem
        </button>
        <button className="btn btn-secondary" onClick={onClear}>
          🗑️ Clear
        </button>
      </div>
    </div>
  )
}

export default ProblemInput