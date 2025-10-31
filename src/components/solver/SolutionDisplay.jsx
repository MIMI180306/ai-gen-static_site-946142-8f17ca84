import React from 'react'
import './SolutionDisplay.css'

const SolutionDisplay = ({ solution }) => {
  if (!solution) return null

  return (
    <div className="solution-display">
      <div className="solution-header">
        <h2>解答过程</h2>
        <span className="problem-type">{solution.type}</span>
      </div>

      <div className="solution-content">
        {solution.steps.map((step, index) => (
          <div key={index} className="solution-step">
            <div className="step-number">{index + 1}</div>
            <div className="step-content">
              <div className="step-formula">{step.formula}</div>
              <div className="step-explanation">{step.explanation}</div>
            </div>
          </div>
        ))}

        <div className="final-answer">
          <div className="answer-label">最终答案</div>
          <div className="answer-value">{solution.answer}</div>
        </div>
      </div>
    </div>
  )
}

export default SolutionDisplay