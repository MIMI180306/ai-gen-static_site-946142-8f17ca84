import React from 'react'
import { useState } from 'react'
import './SolutionDisplay.css'

const SolutionDisplay = ({ solution }) => {
  const [expandedSteps, setExpandedSteps] = useState({})

  const toggleStep = (index) => {
    setExpandedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  if (!solution) return null

  return (
    <div className="solution-display">
      <div className="solution-header">
        <h2>解答步骤</h2>
        <div className="solution-type-badge">{getSolutionTypeName(solution.type)}</div>
      </div>

      <div className="final-answer">
        <div className="answer-label">最终答案</div>
        <div className="answer-value">{solution.answer}</div>
      </div>

      <div className="steps-container">
        <h3 className="steps-title">详细步骤</h3>
        {solution.steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-header" onClick={() => toggleStep(index)}>
              <div className="step-number">{index + 1}</div>
              <div className="step-title-text">{step.title}</div>
              <div className={`step-toggle ${expandedSteps[index] ? 'expanded' : ''}`}>
                {expandedSteps[index] ? '−' : '+'}
              </div>
            </div>
            
            <div className="step-content-wrapper">
              <div className="step-formula">{step.content}</div>
              {expandedSteps[index] && (
                <div className="step-explanation">
                  <div className="explanation-icon">💡</div>
                  <div className="explanation-text">
                    {step.explanation.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="solution-footer">
        <div className="tip-box">
          <span className="tip-icon">✨</span>
          <span>点击每个步骤查看详细解释</span>
        </div>
      </div>
    </div>
  )
}

const getSolutionTypeName = (type) => {
  const types = {
    'linear': '一元一次方程',
    'quadratic': '一元二次方程',
    'arithmetic': '算术运算',
    'fraction': '分数运算',
    'percentage': '百分比计算',
    'general': '一般问题'
  }
  return types[type] || '数学问题'
}

export default SolutionDisplay