import React from 'react'
import { useState } from 'react'
import Header from './components/layout/Header'
import ProblemInput from './components/solver/ProblemInput'
import SolutionDisplay from './components/solver/SolutionDisplay'
import DifficultySelector from './components/solver/DifficultySelector'
import ProblemHistory from './components/solver/ProblemHistory'
import './App.css'

function App() {
  const [difficulty, setDifficulty] = useState('medium')
  const [solution, setSolution] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSolve = (problem) => {
    setLoading(true)
    
    setTimeout(() => {
      const result = solveProblem(problem, difficulty)
      setSolution(result)
      
      const historyItem = {
        id: Date.now(),
        problem: problem,
        difficulty: difficulty,
        timestamp: new Date(),
        solution: result
      }
      
      setHistory(prev => [historyItem, ...prev].slice(0, 10))
      setLoading(false)
    }, 500)
  }

  const solveProblem = (problem, difficulty) => {
    const problemType = detectProblemType(problem)
    
    switch(problemType) {
      case 'linear':
        return solveLinearEquation(problem, difficulty)
      case 'quadratic':
        return solveQuadraticEquation(problem, difficulty)
      case 'arithmetic':
        return solveArithmetic(problem, difficulty)
      case 'fraction':
        return solveFraction(problem, difficulty)
      case 'percentage':
        return solvePercentage(problem, difficulty)
      default:
        return solveGeneral(problem, difficulty)
    }
  }

  const detectProblemType = (problem) => {
    if (problem.includes('x') && problem.includes('=')) {
      if (problem.includes('x^2') || problem.includes('x²')) {
        return 'quadratic'
      }
      return 'linear'
    }
    if (problem.includes('/') && problem.match(/\d+\/\d+/)) {
      return 'fraction'
    }
    if (problem.includes('%')) {
      return 'percentage'
    }
    if (problem.match(/[+\-*/]/)) {
      return 'arithmetic'
    }
    return 'general'
  }

  const solveLinearEquation = (problem, difficulty) => {
    const steps = []
    
    steps.push({
      title: '识别问题类型',
      content: '这是一个一元一次方程',
      explanation: '方程中只有一个未知数x，且x的最高次数为1'
    })

    const match = problem.match(/([\d.]+)?x\s*([+\-])\s*([\d.]+)\s*=\s*([\d.]+)/)
    
    if (match) {
      const a = parseFloat(match[1] || '1')
      const sign = match[2]
      const b = parseFloat(match[3])
      const c = parseFloat(match[4])
      
      steps.push({
        title: '标准形式',
        content: `${a}x ${sign} ${b} = ${c}`,
        explanation: '将方程写成标准形式：ax + b = c'
      })

      const bValue = sign === '+' ? b : -b
      const newC = c - bValue
      
      steps.push({
        title: '移项',
        content: `${a}x = ${newC}`,
        explanation: `将常数项移到等号右边：${c} - ${bValue} = ${newC}`
      })

      const x = newC / a
      
      steps.push({
        title: '求解',
        content: `x = ${x}`,
        explanation: `两边同时除以 ${a}：${newC} ÷ ${a} = ${x}`
      })

      steps.push({
        title: '验证答案',
        content: `将 x = ${x} 代入原方程`,
        explanation: `${a} × ${x} ${sign} ${b} = ${a * x + bValue} = ${c} ✓`
      })

      return {
        answer: `x = ${x}`,
        steps: steps,
        type: 'linear'
      }
    }

    return {
      answer: '无法解析该方程',
      steps: steps,
      type: 'linear'
    }
  }

  const solveQuadraticEquation = (problem, difficulty) => {
    const steps = []
    
    steps.push({
      title: '识别问题类型',
      content: '这是一个一元二次方程',
      explanation: '方程中x的最高次数为2，标准形式为：ax² + bx + c = 0'
    })

    steps.push({
      title: '使用求根公式',
      content: 'x = [-b ± √(b² - 4ac)] / 2a',
      explanation: '这是求解一元二次方程的万能公式'
    })

    steps.push({
      title: '计算判别式',
      content: 'Δ = b² - 4ac',
      explanation: '判别式决定了方程根的性质：\n• Δ > 0：两个不同的实根\n• Δ = 0：两个相同的实根\n• Δ < 0：没有实根（有复数根）'
    })

    return {
      answer: '请使用求根公式计算具体数值',
      steps: steps,
      type: 'quadratic'
    }
  }

  const solveArithmetic = (problem, difficulty) => {
    const steps = []
    
    try {
      const sanitized = problem.replace(/[^0-9+\-*/().\s]/g, '')
      
      steps.push({
        title: '识别运算',
        content: sanitized,
        explanation: '这是一个算术表达式，需要按照运算优先级计算'
      })

      steps.push({
        title: '运算优先级',
        content: '1. 括号\n2. 乘法和除法（从左到右）\n3. 加法和减法（从左到右）',
        explanation: '遵循数学运算的基本规则'
      })

      const result = eval(sanitized)
      
      steps.push({
        title: '计算结果',
        content: `= ${result}`,
        explanation: `按照运算优先级依次计算得出最终答案`
      })

      return {
        answer: result.toString(),
        steps: steps,
        type: 'arithmetic'
      }
    } catch (e) {
      return {
        answer: '表达式格式错误',
        steps: steps,
        type: 'arithmetic'
      }
    }
  }

  const solveFraction = (problem, difficulty) => {
    const steps = []
    
    steps.push({
      title: '识别分数运算',
      content: problem,
      explanation: '这是分数的运算问题'
    })

    const fractionMatch = problem.match(/(\d+)\/(\d+)\s*([+\-*/])\s*(\d+)\/(\d+)/)
    
    if (fractionMatch) {
      const [, a, b, op, c, d] = fractionMatch
      
      steps.push({
        title: '分数形式',
        content: `${a}/${b} ${op} ${c}/${d}`,
        explanation: '识别出两个分数和运算符'
      })

      if (op === '+' || op === '-') {
        const lcm = (parseInt(b) * parseInt(d)) / gcd(parseInt(b), parseInt(d))
        
        steps.push({
          title: '通分',
          content: `最小公倍数 = ${lcm}`,
          explanation: `找到分母 ${b} 和 ${d} 的最小公倍数`
        })

        const newA = (parseInt(a) * lcm) / parseInt(b)
        const newC = (parseInt(c) * lcm) / parseInt(d)
        
        steps.push({
          title: '转换分数',
          content: `${newA}/${lcm} ${op} ${newC}/${lcm}`,
          explanation: '将两个分数转换为相同分母'
        })

        const result = op === '+' ? newA + newC : newA - newC
        
        steps.push({
          title: '计算结果',
          content: `${result}/${lcm}`,
          explanation: `分母相同，直接计算分子：${newA} ${op} ${newC} = ${result}`
        })

        const finalGcd = gcd(Math.abs(result), lcm)
        const simplifiedNum = result / finalGcd
        const simplifiedDen = lcm / finalGcd
        
        if (finalGcd > 1) {
          steps.push({
            title: '化简',
            content: `${simplifiedNum}/${simplifiedDen}`,
            explanation: `约分：分子分母同时除以最大公约数 ${finalGcd}`
          })
        }

        return {
          answer: `${simplifiedNum}/${simplifiedDen}`,
          steps: steps,
          type: 'fraction'
        }
      }
    }

    return {
      answer: '请输入正确的分数运算格式（如：1/2 + 1/3）',
      steps: steps,
      type: 'fraction'
    }
  }

  const solvePercentage = (problem, difficulty) => {
    const steps = []
    
    steps.push({
      title: '识别百分比问题',
      content: problem,
      explanation: '这是一个百分比计算问题'
    })

    const percentMatch = problem.match(/(\d+)\s*%\s*of\s*(\d+)/i)
    
    if (percentMatch) {
      const percent = parseFloat(percentMatch[1])
      const number = parseFloat(percentMatch[2])
      
      steps.push({
        title: '转换百分比',
        content: `${percent}% = ${percent/100}`,
        explanation: '将百分比转换为小数：除以100'
      })

      const result = (percent / 100) * number
      
      steps.push({
        title: '计算',
        content: `${percent/100} × ${number} = ${result}`,
        explanation: `用小数乘以原数得到结果`
      })

      return {
        answer: result.toString(),
        steps: steps,
        type: 'percentage'
      }
    }

    return {
      answer: '请输入正确的百分比格式（如：20% of 100）',
      steps: steps,
      type: 'percentage'
    }
  }

  const solveGeneral = (problem, difficulty) => {
    const steps = []
    
    steps.push({
      title: '分析问题',
      content: problem,
      explanation: '让我们一步步分析这个问题'
    })

    steps.push({
      title: '解题思路',
      content: '1. 理解题意\n2. 列出已知条件\n3. 确定求解目标\n4. 选择合适的方法\n5. 逐步计算\n6. 验证答案',
      explanation: '这是解决数学问题的一般步骤'
    })

    steps.push({
      title: '提示',
      content: '请尝试以下格式输入：\n• 一元一次方程：2x + 3 = 7\n• 算术运算：(5 + 3) * 2\n• 分数运算：1/2 + 1/3\n• 百分比：20% of 100',
      explanation: '系统支持多种类型的数学问题'
    })

    return {
      answer: '请按照提示格式输入问题',
      steps: steps,
      type: 'general'
    }
  }

  const gcd = (a, b) => {
    return b === 0 ? a : gcd(b, a % b)
  }

  const handleHistoryClick = (item) => {
    setSolution(item.solution)
    setDifficulty(item.difficulty)
  }

  return (
    <div className="app">
      <Header />
      <main className="main-container">
        <div className="solver-section">
          <DifficultySelector 
            difficulty={difficulty} 
            onDifficultyChange={setDifficulty} 
          />
          <ProblemInput onSolve={handleSolve} loading={loading} />
          {solution && <SolutionDisplay solution={solution} />}
        </div>
        <aside className="history-section">
          <ProblemHistory 
            history={history} 
            onHistoryClick={handleHistoryClick}
          />
        </aside>
      </main>
    </div>
  )
}

export default App