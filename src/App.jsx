import React, { useState } from 'react'
import Header from './components/layout/Header'
import ProblemInput from './components/solver/ProblemInput'
import SolutionDisplay from './components/solver/SolutionDisplay'
import DifficultySelector from './components/solver/DifficultySelector'
import HistoryPanel from './components/solver/HistoryPanel'
import { solveProblem } from './utils/mathSolver'
import './App.css'

function App() {
  const [problem, setProblem] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [solution, setSolution] = useState(null)
  const [history, setHistory] = useState([])

  const handleSolve = () => {
    if (!problem.trim()) {
      alert('Please enter a math problem')
      return
    }

    const result = solveProblem(problem, difficulty)
    setSolution(result)

    // Add to history
    const newHistory = [
      {
        id: Date.now(),
        problem: problem,
        difficulty: difficulty,
        timestamp: new Date().toLocaleString(),
        result: result
      },
      ...history.slice(0, 9)
    ]
    setHistory(newHistory)
  }

  const handleLoadHistory = (item) => {
    setProblem(item.problem)
    setDifficulty(item.difficulty)
    setSolution(item.result)
  }

  const handleClear = () => {
    setProblem('')
    setSolution(null)
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
            />
          </div>
          
          {solution && (
            <SolutionDisplay solution={solution} />
          )}
        </div>

        {history.length > 0 && (
          <HistoryPanel 
            history={history}
            onLoadHistory={handleLoadHistory}
            onClearHistory={() => setHistory([])}
          />
        )}
      </main>
    </div>
  )
}

export default App