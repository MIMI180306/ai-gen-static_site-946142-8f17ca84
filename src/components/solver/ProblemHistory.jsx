import React from 'react'
import './ProblemHistory.css'

const ProblemHistory = ({ history, onHistoryClick }) => {
  const formatTime = (date) => {
    const now = new Date()
    const diff = Math.floor((now - date) / 1000)
    
    if (diff < 60) return '刚刚'
    if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`
    if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`
    return date.toLocaleDateString('zh-CN')
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'easy': '#4ade80',
      'medium': '#f59e0b',
      'hard': '#ef4444'
    }
    return colors[difficulty] || '#666'
  }

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      'easy': '简单',
      'medium': '中等',
      'hard': '困难'
    }
    return labels[difficulty] || difficulty
  }

  return (
    <div className="problem-history">
      <div className="history-header">
        <h3>历史记录</h3>
        <span className="history-count">{history.length}/10</span>
      </div>

      {history.length === 0 ? (
        <div className="empty-history">
          <div className="empty-icon">📝</div>
          <p>还没有解题记录</p>
          <p className="empty-hint">开始输入问题吧！</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div
              key={item.id}
              className="history-item"
              onClick={() => onHistoryClick(item)}
            >
              <div className="history-item-header">
                <span 
                  className="history-difficulty"
                  style={{ backgroundColor: getDifficultyColor(item.difficulty) }}
                >
                  {getDifficultyLabel(item.difficulty)}
                </span>
                <span className="history-time">{formatTime(item.timestamp)}</span>
              </div>
              
              <div className="history-problem">{item.problem}</div>
              
              <div className="history-answer">
                <span className="answer-label">答案：</span>
                <span className="answer-text">{item.solution.answer}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProblemHistory