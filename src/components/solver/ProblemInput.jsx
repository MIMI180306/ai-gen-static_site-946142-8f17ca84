import React from 'react'
import './ProblemInput.css'

const ProblemInput = ({ problem, onProblemChange, onSolve, onClear }) => {
  const examples = [
    '2x + 5 = 15',
    'x^2 - 5x + 6 = 0',
    '3/4 + 2/3',
    '15% of 200',
    '(3 + 5) * 2 - 4'
  ]

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSolve()
    }
  }

  return (
    <div className="problem-input">
      <label htmlFor="problem">Enter Your Math Problem:</label>
      <textarea
        id="problem"
        value={problem}
        onChange={(e) => onProblemChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="e.g., 2x + 5 = 15 or x^2 - 4x + 4 = 0"
        rows="3"
      />
      
      <div className="examples">
        <span className="examples-label">Examples:</span>
        <div className="examples-list">
          {examples.map((example, index) => (
            <button
              key={index}
              className="example-btn"
              onClick={() => onProblemChange(example)}
              title="Click to use this example"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <div className="button-group">
        <button className="solve-btn" onClick={onSolve}>
          Solve Problem
        </button>
        <button className="clear-btn" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  )
}

export default ProblemInput