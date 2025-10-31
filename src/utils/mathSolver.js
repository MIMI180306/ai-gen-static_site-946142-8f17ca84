/**
 * Solve various types of math problems
 * @param {string} problem - The math problem to solve
 * @param {string} difficulty - Difficulty level (easy, medium, hard)
 * @returns {object} Solution with steps and answer
 */
export function solveProblem(problem, difficulty) {
  try {
    const trimmedProblem = problem.trim()

    // Detect problem type
    if (trimmedProblem.includes('=') && trimmedProblem.includes('x')) {
      if (trimmedProblem.includes('x^2') || trimmedProblem.includes('x²')) {
        return solveQuadratic(trimmedProblem, difficulty)
      }
      return solveLinear(trimmedProblem, difficulty)
    }

    if (trimmedProblem.includes('/') && !trimmedProblem.includes('x')) {
      return solveFraction(trimmedProblem, difficulty)
    }

    if (trimmedProblem.toLowerCase().includes('percent') || 
        trimmedProblem.toLowerCase().includes('%')) {
      return solvePercentage(trimmedProblem, difficulty)
    }

    return solveArithmetic(trimmedProblem, difficulty)
  } catch (error) {
    return { error: 'Unable to solve this problem. Please check your input.' }
  }
}

/**
 * Solve linear equations (ax + b = c)
 */
function solveLinear(problem, difficulty) {
  const steps = []
  const [left, right] = problem.split('=')
  
  // Extract coefficients
  const leftNum = parseFloat(left.match(/-?\d+(?=x)/)?.[0] || '1')
  const leftConst = parseFloat(left.match(/[+-]\s*\d+(?!x)/)?.[0] || '0')
  const rightNum = parseFloat(right.trim())

  steps.push({
    formula: problem,
    explanation: 'Original equation'
  })

  if (difficulty !== 'easy') {
    if (leftConst !== 0) {
      const newRight = rightNum - leftConst
      steps.push({
        formula: `${leftNum}x = ${newRight}`,
        explanation: `Subtract ${leftConst} from both sides`
      })
    }
  }

  const solution = (rightNum - leftConst) / leftNum

  if (difficulty === 'hard') {
    steps.push({
      formula: `x = ${rightNum - leftConst} ÷ ${leftNum}`,
      explanation: `Divide both sides by ${leftNum}`
    })
  }

  steps.push({
    formula: `x = ${solution}`,
    explanation: 'Final answer'
  })

  return {
    type: 'Linear Equation',
    steps,
    answer: `x = ${solution}`
  }
}

/**
 * Solve quadratic equations (ax^2 + bx + c = 0)
 */
function solveQuadratic(problem, difficulty) {
  const steps = []
  const equation = problem.split('=')[0].trim()
  
  // Extract coefficients (simplified parsing)
  const aMatch = equation.match(/-?\d*x\^?2|x²/)
  const a = aMatch ? (aMatch[0].match(/-?\d+/) ? parseFloat(aMatch[0].match(/-?\d+/)[0]) : 1) : 1
  
  const bMatch = equation.match(/[+-]\s*\d*x(?!\^)(?!²)/)
  const b = bMatch ? parseFloat(bMatch[0].replace(/\s/g, '').replace('x', '') || '1') : 0
  
  const cMatch = equation.match(/[+-]\s*\d+(?!x)/)
  const c = cMatch ? parseFloat(cMatch[0].replace(/\s/g, '')) : 0

  steps.push({
    formula: problem,
    explanation: 'Original equation'
  })

  const discriminant = b * b - 4 * a * c

  if (difficulty !== 'easy') {
    steps.push({
      formula: `Discriminant = b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`,
      explanation: 'Calculate the discriminant to determine solution type'
    })
  }

  if (discriminant < 0) {
    return {
      type: 'Quadratic Equation',
      steps,
      answer: 'No real solutions (discriminant < 0)'
    }
  }

  const x1 = (-b + Math.sqrt(discriminant)) / (2 * a)
  const x2 = (-b - Math.sqrt(discriminant)) / (2 * a)

  if (difficulty === 'hard') {
    steps.push({
      formula: `x = (-b ± √discriminant) / 2a`,
      explanation: 'Using the quadratic formula'
    })
  }

  steps.push({
    formula: `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`,
    explanation: 'Two solutions found'
  })

  return {
    type: 'Quadratic Equation',
    steps,
    answer: `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`
  }
}

/**
 * Solve fraction operations
 */
function solveFraction(problem, difficulty) {
  const steps = []
  
  steps.push({
    formula: problem,
    explanation: 'Original fraction operation'
  })

  // Simple fraction addition/subtraction
  const fractions = problem.match(/\d+\/\d+/g)
  if (fractions && fractions.length === 2) {
    const [num1, den1] = fractions[0].split('/').map(Number)
    const [num2, den2] = fractions[1].split('/').map(Number)
    
    const operator = problem.includes('+') ? '+' : '-'
    
    if (difficulty !== 'easy') {
      const lcm = (den1 * den2) / gcd(den1, den2)
      steps.push({
        formula: `LCD = ${lcm}`,
        explanation: `Find the least common denominator`
      })
    }

    const commonDen = (den1 * den2) / gcd(den1, den2)
    const newNum1 = num1 * (commonDen / den1)
    const newNum2 = num2 * (commonDen / den2)

    if (difficulty === 'hard') {
      steps.push({
        formula: `${newNum1}/${commonDen} ${operator} ${newNum2}/${commonDen}`,
        explanation: 'Convert to common denominator'
      })
    }

    const resultNum = operator === '+' ? newNum1 + newNum2 : newNum1 - newNum2
    const divisor = gcd(Math.abs(resultNum), commonDen)
    const finalNum = resultNum / divisor
    const finalDen = commonDen / divisor

    steps.push({
      formula: `${finalNum}/${finalDen}`,
      explanation: 'Simplified result'
    })

    return {
      type: 'Fraction Operation',
      steps,
      answer: `${finalNum}/${finalDen}`
    }
  }

  return {
    type: 'Fraction Operation',
    steps,
    answer: 'Unable to solve this fraction'
  }
}

/**
 * Solve percentage problems
 */
function solvePercentage(problem, difficulty) {
  const steps = []
  
  steps.push({
    formula: problem,
    explanation: 'Original percentage problem'
  })

  const percentMatch = problem.match(/\d+%|\d+\s*percent/i)
  const numberMatch = problem.match(/of\s+(\d+)/i)

  if (percentMatch && numberMatch) {
    const percent = parseFloat(percentMatch[0])
    const number = parseFloat(numberMatch[1])
    
    if (difficulty !== 'easy') {
      steps.push({
        formula: `${percent}% = ${percent / 100}`,
        explanation: 'Convert percentage to decimal'
      })
    }

    const result = (percent / 100) * number

    if (difficulty === 'hard') {
      steps.push({
        formula: `${percent / 100} × ${number} = ${result}`,
        explanation: 'Multiply decimal by the number'
      })
    }

    steps.push({
      formula: `${result}`,
      explanation: 'Final answer'
    })

    return {
      type: 'Percentage Calculation',
      steps,
      answer: `${result}`
    }
  }

  return {
    type: 'Percentage Calculation',
    steps,
    answer: 'Unable to solve this percentage problem'
  }
}

/**
 * Solve basic arithmetic
 */
function solveArithmetic(problem, difficulty) {
  const steps = []
  
  steps.push({
    formula: problem,
    explanation: 'Original arithmetic expression'
  })

  try {
    // Safe evaluation (limited to basic operations)
    const sanitized = problem.replace(/[^0-9+\-*/().\s]/g, '')
    const result = Function('"use strict"; return (' + sanitized + ')')()

    if (difficulty === 'hard') {
      steps.push({
        formula: `Evaluating: ${sanitized}`,
        explanation: 'Following order of operations (PEMDAS)'
      })
    }

    steps.push({
      formula: `= ${result}`,
      explanation: 'Final result'
    })

    return {
      type: 'Arithmetic Operation',
      steps,
      answer: `${result}`
    }
  } catch (error) {
    return {
      error: 'Invalid arithmetic expression'
    }
  }
}

/**
 * Greatest common divisor helper
 */
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b)
}