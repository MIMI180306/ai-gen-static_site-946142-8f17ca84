/**
 * Solve math problems with step-by-step explanations
 * @param {string} problem - The math problem to solve
 * @param {string} difficulty - Difficulty level: easy, medium, hard
 * @returns {object} Solution with steps and answer
 */
export function solveProblem(problem, difficulty) {
  const trimmedProblem = problem.trim()
  
  // Detect problem type
  if (trimmedProblem.includes('=') && trimmedProblem.includes('x')) {
    if (trimmedProblem.includes('^2') || trimmedProblem.includes('x²')) {
      return solveQuadraticEquation(trimmedProblem, difficulty)
    } else {
      return solveLinearEquation(trimmedProblem, difficulty)
    }
  } else if (trimmedProblem.includes('/') && !trimmedProblem.includes('(')) {
    return solveFraction(trimmedProblem, difficulty)
  } else if (trimmedProblem.includes('%')) {
    return solvePercentage(trimmedProblem, difficulty)
  } else {
    return solveArithmetic(trimmedProblem, difficulty)
  }
}

/**
 * Solve linear equations (e.g., 2x + 5 = 15)
 */
function solveLinearEquation(problem, difficulty) {
  try {
    const [left, right] = problem.split('=')
    const rightValue = parseFloat(right.trim())
    
    // Parse left side
    const match = left.match(/([+-]?\d*)x([+-]?\d+)?/)
    if (!match) throw new Error('Invalid equation format')
    
    const coefficient = match[1] === '' || match[1] === '+' ? 1 : match[1] === '-' ? -1 : parseFloat(match[1])
    const constant = match[2] ? parseFloat(match[2]) : 0
    
    const x = (rightValue - constant) / coefficient
    
    const steps = []
    
    if (difficulty === 'hard') {
      steps.push({
        label: 'Original Equation',
        formula: problem,
        explanation: 'We start with the given equation and need to isolate x.'
      })
    }
    
    if (constant !== 0) {
      const newRight = rightValue - constant
      steps.push({
        label: 'Subtract constant from both sides',
        formula: `${coefficient}x = ${newRight}`,
        explanation: difficulty === 'easy' 
          ? `Subtract ${constant} from both sides` 
          : `To isolate the term with x, we subtract ${constant} from both sides of the equation. This gives us ${coefficient}x = ${newRight}.`
      })
    }
    
    steps.push({
      label: 'Divide both sides by coefficient',
      formula: `x = ${x}`,
      explanation: difficulty === 'easy'
        ? `Divide both sides by ${coefficient}`
        : `Now we divide both sides by ${coefficient} to solve for x. This gives us x = ${x}.`
    })
    
    if (difficulty === 'hard') {
      steps.push({
        label: 'Verification',
        formula: `${coefficient}(${x}) + ${constant} = ${rightValue}`,
        explanation: `Let's verify: substituting x = ${x} into the original equation gives us ${coefficient * x + constant} = ${rightValue}, which is correct.`
      })
    }
    
    return {
      type: 'Linear Equation',
      steps: steps,
      answer: `x = ${x}`
    }
  } catch (error) {
    return {
      error: 'Unable to solve this linear equation. Please check the format (e.g., 2x + 5 = 15)'
    }
  }
}

/**
 * Solve quadratic equations (e.g., x^2 - 5x + 6 = 0)
 */
function solveQuadraticEquation(problem, difficulty) {
  try {
    const normalized = problem.replace('x²', 'x^2')
    const [left] = normalized.split('=')
    
    // Parse coefficients
    const aMatch = left.match(/([+-]?\d*)x\^2/)
    const bMatch = left.match(/([+-]\d+)x(?!\^)/)
    const cMatch = left.match(/([+-]?\d+)(?!x)/g)
    
    const a = aMatch ? (aMatch[1] === '' || aMatch[1] === '+' ? 1 : aMatch[1] === '-' ? -1 : parseFloat(aMatch[1])) : 0
    const b = bMatch ? parseFloat(bMatch[1]) : 0
    const c = cMatch ? parseFloat(cMatch[cMatch.length - 1]) : 0
    
    const discriminant = b * b - 4 * a * c
    
    const steps = []
    
    if (difficulty === 'hard') {
      steps.push({
        label: 'Identify coefficients',
        formula: `a = ${a}, b = ${b}, c = ${c}`,
        explanation: `For a quadratic equation ax² + bx + c = 0, we identify the coefficients from the given equation.`
      })
    }
    
    steps.push({
      label: 'Calculate discriminant',
      formula: `Δ = b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`,
      explanation: difficulty === 'easy'
        ? 'Calculate discriminant using b² - 4ac'
        : `The discriminant helps us determine the nature of the roots. We calculate it using the formula Δ = b² - 4ac.`
    })
    
    if (discriminant < 0) {
      return {
        type: 'Quadratic Equation',
        steps: steps,
        answer: 'No real solutions (discriminant < 0)'
      }
    }
    
    const sqrtDiscriminant = Math.sqrt(discriminant)
    const x1 = (-b + sqrtDiscriminant) / (2 * a)
    const x2 = (-b - sqrtDiscriminant) / (2 * a)
    
    steps.push({
      label: 'Apply quadratic formula',
      formula: `x = (-b ± √Δ) / 2a = (${-b} ± ${sqrtDiscriminant.toFixed(2)}) / ${2 * a}`,
      explanation: difficulty === 'easy'
        ? 'Use quadratic formula to find solutions'
        : `We use the quadratic formula x = (-b ± √Δ) / 2a to find the two possible values of x.`
    })
    
    steps.push({
      label: 'Calculate solutions',
      formula: `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`,
      explanation: `The two solutions are x₁ = ${x1.toFixed(2)} and x₂ = ${x2.toFixed(2)}.`
    })
    
    return {
      type: 'Quadratic Equation',
      steps: steps,
      answer: x1 === x2 ? `x = ${x1.toFixed(2)}` : `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`
    }
  } catch (error) {
    return {
      error: 'Unable to solve this quadratic equation. Please check the format (e.g., x^2 - 5x + 6 = 0)'
    }
  }
}

/**
 * Solve fraction operations
 */
function solveFraction(problem, difficulty) {
  try {
    const parts = problem.match(/(\d+)\/(\d+)\s*([+\-*])\s*(\d+)\/(\d+)/)
    if (!parts) throw new Error('Invalid fraction format')
    
    const [, num1, den1, operator, num2, den2] = parts
    const n1 = parseInt(num1), d1 = parseInt(den1)
    const n2 = parseInt(num2), d2 = parseInt(den2)
    
    const steps = []
    let resultNum, resultDen
    
    if (operator === '+' || operator === '-') {
      const lcm = (d1 * d2) / gcd(d1, d2)
      const newN1 = n1 * (lcm / d1)
      const newN2 = n2 * (lcm / d2)
      
      if (difficulty !== 'easy') {
        steps.push({
          label: 'Find common denominator',
          formula: `LCM(${d1}, ${d2}) = ${lcm}`,
          explanation: difficulty === 'medium'
            ? 'Find least common multiple for denominators'
            : `To add or subtract fractions, we need a common denominator. The least common multiple of ${d1} and ${d2} is ${lcm}.`
        })
      }
      
      steps.push({
        label: 'Convert to common denominator',
        formula: `${num1}/${den1} = ${newN1}/${lcm}, ${num2}/${den2} = ${newN2}/${lcm}`,
        explanation: `Convert both fractions to have denominator ${lcm}.`
      })
      
      resultNum = operator === '+' ? newN1 + newN2 : newN1 - newN2
      resultDen = lcm
      
      steps.push({
        label: operator === '+' ? 'Add numerators' : 'Subtract numerators',
        formula: `${newN1} ${operator} ${newN2} = ${resultNum}`,
        explanation: `${operator === '+' ? 'Add' : 'Subtract'} the numerators while keeping the common denominator.`
      })
    } else {
      resultNum = n1 * n2
      resultDen = d1 * d2
      
      steps.push({
        label: 'Multiply numerators and denominators',
        formula: `(${n1} × ${n2}) / (${d1} × ${d2}) = ${resultNum}/${resultDen}`,
        explanation: 'Multiply the numerators together and denominators together.'
      })
    }
    
    const divisor = gcd(resultNum, resultDen)
    const simplifiedNum = resultNum / divisor
    const simplifiedDen = resultDen / divisor
    
    if (divisor > 1) {
      steps.push({
        label: 'Simplify',
        formula: `${resultNum}/${resultDen} = ${simplifiedNum}/${simplifiedDen}`,
        explanation: `Divide both numerator and denominator by their GCD (${divisor}) to simplify.`
      })
    }
    
    return {
      type: 'Fraction Operation',
      steps: steps,
      answer: simplifiedDen === 1 ? `${simplifiedNum}` : `${simplifiedNum}/${simplifiedDen}`
    }
  } catch (error) {
    return {
      error: 'Unable to solve this fraction problem. Please check the format (e.g., 3/4 + 2/3)'
    }
  }
}

/**
 * Solve percentage problems
 */
function solvePercentage(problem, difficulty) {
  try {
    const match = problem.match(/(\d+)%\s*of\s*(\d+)/)
    if (!match) throw new Error('Invalid percentage format')
    
    const [, percentage, number] = match
    const percent = parseFloat(percentage)
    const num = parseFloat(number)
    
    const result = (percent / 100) * num
    
    const steps = []
    
    if (difficulty === 'hard') {
      steps.push({
        label: 'Understanding the problem',
        formula: `${percent}% of ${num}`,
        explanation: `We need to find ${percent}% of ${num}. Percent means "per hundred", so ${percent}% equals ${percent}/100.`
      })
    }
    
    steps.push({
      label: 'Convert percentage to decimal',
      formula: `${percent}% = ${percent}/100 = ${percent / 100}`,
      explanation: difficulty === 'easy'
        ? 'Convert percentage to decimal'
        : `To convert a percentage to decimal, we divide by 100. So ${percent}% becomes ${percent / 100}.`
    })
    
    steps.push({
      label: 'Multiply by the number',
      formula: `${percent / 100} × ${num} = ${result}`,
      explanation: `Multiply the decimal by ${num} to get the answer.`
    })
    
    return {
      type: 'Percentage Calculation',
      steps: steps,
      answer: result.toString()
    }
  } catch (error) {
    return {
      error: 'Unable to solve this percentage problem. Please check the format (e.g., 15% of 200)'
    }
  }
}

/**
 * Solve arithmetic expressions
 */
function solveArithmetic(problem, difficulty) {
  try {
    const result = eval(problem)
    
    const steps = []
    
    if (difficulty === 'hard') {
      steps.push({
        label: 'Original expression',
        formula: problem,
        explanation: 'We need to evaluate this arithmetic expression following the order of operations (PEMDAS/BODMAS).'
      })
    }
    
    if (problem.includes('(')) {
      steps.push({
        label: 'Evaluate parentheses first',
        explanation: difficulty === 'easy'
          ? 'Calculate values inside parentheses'
          : 'According to order of operations, we evaluate expressions inside parentheses first.'
      })
    }
    
    if (problem.includes('*') || problem.includes('/')) {
      steps.push({
        label: 'Perform multiplication/division',
        explanation: 'Multiplication and division are performed from left to right.'
      })
    }
    
    steps.push({
      label: 'Final calculation',
      formula: `= ${result}`,
      explanation: `The final result is ${result}.`
    })
    
    return {
      type: 'Arithmetic Expression',
      steps: steps,
      answer: result.toString()
    }
  } catch (error) {
    return {
      error: 'Unable to evaluate this expression. Please check the format.'
    }
  }
}

/**
 * Calculate greatest common divisor
 */
function gcd(a, b) {
  return b === 0 ? Math.abs(a) : gcd(b, a % b)
}