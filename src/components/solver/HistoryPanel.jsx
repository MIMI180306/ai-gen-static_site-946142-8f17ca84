import React from 'react'
import './HistoryPanel.css'

const HistoryPanel = ({ history, onLoadHistory, onClearHistory }) => {
  return (
    <div className="history-panel">
      <div className="history-header">
        <h3>Solution History</h3>
        <button className="clear-history-btn" onClick={onClearHistory}>
          Clear All
        </button>
      </div>

      <div className="history-list">
        {history.map((item) => (
          <div 
            key={item.id} 
            className="history-item"
            onClick={() => onLoadHistory(item)}
          >
            <div className="history-item-header">
              <span className="history-problem">{item.problem}</span>
              <span className="history-difficulty">{item.difficulty}</span>
            </div>
            <div className="history-timestamp">{item.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistoryPanel