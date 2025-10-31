import React from 'react'
import './HistoryPanel.css'

function HistoryPanel({ history, onLoadHistory, onClearHistory }) {
  if (history.length === 0) return null

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="history-panel">
      <div className="history-header">
        <h3 className="history-title">📜 Solution History</h3>
        <button className="clear-history-btn" onClick={onClearHistory}>
          Clear All
        </button>
      </div>

      <div className="history-list">
        {history.map((item, index) => (
          <div 
            key={index} 
            className="history-item"
            onClick={() => onLoadHistory(item)}
          >
            <div className="history-problem">{item.problem}</div>
            <div className="history-meta">
              <span className="history-type">{item.solution.type}</span>
              <span className="history-date">{formatDate(item.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistoryPanel