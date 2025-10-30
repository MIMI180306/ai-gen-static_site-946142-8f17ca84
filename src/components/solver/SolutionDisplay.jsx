import React from 'react'
import './SolutionDisplay.css'

const SolutionDisplay = ({ solution }) => {
  if (!solution) return null

  return (
    <div className="solution-display">
      <h2 className="solution-title">Solution</h2>
      
      {solution.error ? (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <p>{solution.error}</p>
        </div>
      ) : (
        <>
          <div className="problem-type">
            <span className="type-label">Problem Type:</span>
            <span className="type-value">{solution.type}</span>
          </div>

          <div className="steps-container">
            <h3 className="steps-title">Step-by-Step Solution:</h3>
            {solution.steps.map((step, index) => (
              <div key={index} className="step">
                <div className="step-header">
                  <span className="step-number">Step {index + 1}</span>
                  <span className="step-label">{step.label}</span>
                </div>
                {step.formula && (
                  <div className="step-formula">{step.formula}</div>
                )}
                <div className="step-explanation">{step.explanation}</div>
              </div>
            ))}
          </div>

          <div className="final-answer">
            <span className="answer-label">Final Answer:</span>
            <span className="answer-value">{solution.answer}</span>
          </div>
        </>
      )}
    </div>
  )
}

export default SolutionDisplay