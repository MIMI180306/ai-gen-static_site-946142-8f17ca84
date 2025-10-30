import React from 'react'
import { useState } from 'react'
import './ProblemInput.css'

const ProblemInput = ({ onSolve, loading }) => {
  const [problem, setProblem] = useState('')
  const [examples] = useState([
    '2x + 5 = 13',
    '(8 + 4) * 3 - 2',
    '1/2 + 1/3',
    '25% of 200'
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (problem.trim()) {
      onSolve(problem)
    }
  }

  const handleExampleClick = (example) => {
    setProblem(example)
  }

  return (
    <div className="problem-input-container">
      <form onSubmit={handleSubmit} className="problem-form">
        <div className="input-wrapper">
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="输入你的数学问题，例如：2x + 5 = 13"
            className="problem-textarea"
            rows="3"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="solve-button"
            disabled={!problem.trim() || loading}
          >
            {loading ? (
              <span className="loading-spinner">⟳</span>
            ) : (
              '解答问题'
            )}
          </button>
        </div>
      </form>
      
      <div className="examples-section">
        <p className="examples-label">试试这些例子：</p>
        <div className="examples-grid">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="example-button"
              disabled={loading}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProblemInput