import React from 'react'
import './HistoryPanel.css'

const HistoryPanel = ({ history, onLoad }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return '刚刚'
    if (minutes < 60) return `${minutes}分钟前`
    if (hours < 24) return `${hours}小时前`
    if (days < 7) return `${days}天前`
    return date.toLocaleDateString('zh-CN')
  }

  return (
    <div className="history-panel">
      <div className="history-header">
        <h3>📚 历史记录</h3>
        <span className="history-count">{history.length}/10</span>
      </div>

      {history.length === 0 ? (
        <div className="empty-history">
          <p>还没有解题记录</p>
          <p className="empty-hint">开始解答问题来创建历史记录</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item, index) => (
            <div 
              key={index} 
              className="history-item"
              onClick={() => onLoad(item)}
            >
              <div className="history-problem">{item.problem}</div>
              <div className="history-meta">
                <span className="history-difficulty">
                  {item.difficulty === 'easy' ? '🟢' : item.difficulty === 'medium' ? '🟡' : '🔴'}
                  {item.difficulty === 'easy' ? '简单' : item.difficulty === 'medium' ? '中等' : '困难'}
                </span>
                <span className="history-time">{formatDate(item.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HistoryPanel