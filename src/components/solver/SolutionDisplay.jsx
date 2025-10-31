import React from 'react'
import './SolutionDisplay.css'

function SolutionDisplay({ solution }) {
  if (!solution) return null

  return (
    <div className="solution-display">
      <div className="solution-header">
        <h2 className="solution-title">📊 Solution</h2>
        <span className="problem-type">{solution.type}</span>
      </div>

      <div className="solution-content">
        <div className="steps-section">
          <h3 className="section-title">Step-by-Step Solution:</h3>
          {solution.steps.map((step, index) => (
            <div key={index} className="step-item">
              <div className="step-number">Step {index + 1}</div>
              <div className="step-content">
                {step.formula && (
                  <div className="step-formula">{step.formula}</div>
                )}
                <div className="step-explanation">{step.explanation}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="answer-section">
          <div className="answer-label">Final Answer:</div>
          <div className="answer-value">{solution.answer}</div>
        </div>
      </div>
    </div>
  )
}

export default SolutionDisplay