import React from 'react'
import { useState } from 'react'
import './App.css'
import Header from './components/layout/Header'
import ProblemInput from './components/solver/ProblemInput'
import SolutionDisplay from './components/solver/SolutionDisplay'
import DifficultySelector from './components/solver/DifficultySelector'
import HistoryPanel from './components/solver/HistoryPanel'
import { solveProblem } from './utils/mathSolver'

function App() {
  const [problem, setProblem] = useState('')
  const [solution, setSolution] = useState(null)
  const [difficulty, setDifficulty] = useState('medium')
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('mathHistory')
    return saved ? JSON.parse(saved) : []
  })

  const handleSolve = () => {
    if (!problem.trim()) {
      alert('请输入一个数学问题')
      return
    }

    const result = solveProblem(problem, difficulty)
    setSolution(result)

    const newHistory = [
      {
        problem,
        solution: result,
        difficulty,
        timestamp: new Date().toISOString()
      },
      ...history
    ].slice(0, 10)

    setHistory(newHistory)
    localStorage.setItem('mathHistory', JSON.stringify(newHistory))
  }

  const handleClear = () => {
    setProblem('')
    setSolution(null)
  }

  const handleLoadHistory = (item) => {
    setProblem(item.problem)
    setSolution(item.solution)
    setDifficulty(item.difficulty)
  }

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="solver-container">
          <div className="left-panel">
            <DifficultySelector 
              difficulty={difficulty} 
              onSelect={setDifficulty} 
            />
            
            <ProblemInput
              problem={problem}
              onChange={setProblem}
              onSolve={handleSolve}
              onClear={handleClear}
            />

            {solution && (
              <SolutionDisplay solution={solution} />
            )}
          </div>

          <div className="right-panel">
            <HistoryPanel 
              history={history}
              onLoad={handleLoadHistory}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App