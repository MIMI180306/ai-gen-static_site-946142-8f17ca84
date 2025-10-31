import React from 'react'
import { useState } from 'react'
import Header from './components/layout/Header'
import ProblemInput from './components/solver/ProblemInput'
import SolutionDisplay from './components/solver/SolutionDisplay'
import DifficultySelector from './components/solver/DifficultySelector'
import HistoryPanel from './components/solver/HistoryPanel'
import { solveProblem } from './utils/mathSolver'
import './App.css'

function App() {
  const [problem, setProblem] = useState('')
  const [solution, setSolution] = useState(null)
  const [difficulty, setDifficulty] = useState('medium')
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('problemHistory')
    return saved ? JSON.parse(saved) : []
  })
  const [error, setError] = useState('')

  const handleSolve = () => {
    if (!problem.trim()) {
      setError('Please enter a math problem')
      return
    }

    setError('')
    const result = solveProblem(problem, difficulty)
    
    if (result.error) {
      setError(result.error)
      setSolution(null)
    } else {
      setSolution(result)
      const newHistory = [
        { problem, solution: result, timestamp: new Date().toISOString() },
        ...history.slice(0, 9)
      ]
      setHistory(newHistory)
      localStorage.setItem('problemHistory', JSON.stringify(newHistory))
    }
  }

  const handleClear = () => {
    setProblem('')
    setSolution(null)
    setError('')
  }

  const handleLoadHistory = (item) => {
    setProblem(item.problem)
    setSolution(item.solution)
    setError('')
  }

  const handleClearHistory = () => {
    setHistory([])
    localStorage.removeItem('problemHistory')
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="solver-container">
          <div className="input-section">
            <DifficultySelector 
              difficulty={difficulty} 
              onDifficultyChange={setDifficulty} 
            />
            <ProblemInput
              problem={problem}
              onProblemChange={setProblem}
              onSolve={handleSolve}
              onClear={handleClear}
              error={error}
            />
          </div>
          
          {solution && (
            <SolutionDisplay solution={solution} />
          )}
        </div>

        <HistoryPanel
          history={history}
          onLoadHistory={handleLoadHistory}
          onClearHistory={handleClearHistory}
        />
      </main>
    </div>
  )
}

export default App