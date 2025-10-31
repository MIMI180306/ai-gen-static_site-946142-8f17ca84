import React from 'react'
import './ProblemInput.css'

const ProblemInput = ({ problem, onChange, onSolve, onClear }) => {
  const examples = [
    '2x + 5 = 13',
    'x^2 - 5x + 6 = 0',
    '3/4 + 2/3',
    '25% of 80',
    '123 + 456'
  ]

  const handleExampleClick = (example) => {
    onChange(example)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      onSolve()
    }
  }

  return (
    <div className="problem-input-container">
      <div className="input-header">
        <h2>输入问题</h2>
        <span className="input-hint">支持方程、算术、分数、百分比等</span>
      </div>

      <textarea
        className="problem-input"
        value={problem}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="例如: 2x + 5 = 13 或 x^2 - 5x + 6 = 0"
        rows="4"
      />

      <div className="examples-section">
        <p className="examples-title">示例问题：</p>
        <div className="examples-grid">
          {examples.map((example, index) => (
            <button
              key={index}
              className="example-button"
              onClick={() => handleExampleClick(example)}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <div className="input-actions">
        <button className="solve-button" onClick={onSolve}>
          <span>🚀</span> 解答问题
        </button>
        <button className="clear-button" onClick={onClear}>
          <span>🗑️</span> 清除
        </button>
      </div>

      <p className="keyboard-hint">💡 提示：按 Ctrl + Enter 快速解答</p>
    </div>
  )
}

export default ProblemInput