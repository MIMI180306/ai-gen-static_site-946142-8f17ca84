/**
 * 数学问题求解器
 * 支持多种类型的数学问题求解
 */

/**
 * 主要求解函数
 * @param {string} problem - 数学问题
 * @param {string} difficulty - 难度级别 (easy/medium/hard)
 * @returns {object} 包含解题步骤和答案的对象
 */
export const solveProblem = (problem, difficulty) => {
  const trimmedProblem = problem.trim()

  // 检测问题类型
  if (trimmedProblem.includes('=') && !trimmedProblem.includes('^2')) {
    return solveLinearEquation(trimmedProblem, difficulty)
  } else if (trimmedProblem.includes('^2') || trimmedProblem.includes('x²')) {
    return solveQuadraticEquation(trimmedProblem, difficulty)
  } else if (trimmedProblem.includes('/') && trimmedProblem.split('/').length === 2) {
    return solveFraction(trimmedProblem, difficulty)
  } else if (trimmedProblem.includes('%') || trimmedProblem.toLowerCase().includes('of')) {
    return solvePercentage(trimmedProblem, difficulty)
  } else {
    return solveArithmetic(trimmedProblem, difficulty)
  }
}

/**
 * 求解一元一次方程
 */
const solveLinearEquation = (problem, difficulty) => {
  try {
    // 解析方程 ax + b = c
    const [left, right] = problem.split('=')
    const rightValue = parseFloat(right.trim())

    // 提取系数
    let a = 0, b = 0
    const terms = left.replace(/\s/g, '').split(/(?=[+-])/)

    terms.forEach(term => {
      if (term.includes('x')) {
        const coef = term.replace('x', '')
        a += coef === '' || coef === '+' ? 1 : coef === '-' ? -1 : parseFloat(coef)
      } else {
        b += parseFloat(term) || 0
      }
    })

    const x = (rightValue - b) / a

    const steps = []

    if (difficulty === 'easy') {
      steps.push({
        formula: `${problem}`,
        explanation: '原方程'
      })
      steps.push({
        formula: `x = ${x}`,
        explanation: '求解得到答案'
      })
    } else if (difficulty === 'medium') {
      steps.push({
        formula: problem,
        explanation: '原方程'
      })
      steps.push({
        formula: `${a}x = ${rightValue} - (${b})`,
        explanation: `将常数项移到等式右边`
      })
      steps.push({
        formula: `${a}x = ${rightValue - b}`,
        explanation: '计算右边的值'
      })
      steps.push({
        formula: `x = ${rightValue - b} ÷ ${a}`,
        explanation: `两边同时除以 ${a}`
      })
      steps.push({
        formula: `x = ${x}`,
        explanation: '得到最终答案'
      })
    } else {
      steps.push({
        formula: problem,
        explanation: '给定的一元一次方程'
      })
      steps.push({
        formula: `${a}x + ${b} = ${rightValue}`,
        explanation: `标准形式：系数a=${a}，常数b=${b}`
      })
      steps.push({
        formula: `${a}x = ${rightValue} - (${b})`,
        explanation: `移项：将常数项${b}移到等式右边，符号相反`
      })
      steps.push({
        formula: `${a}x = ${rightValue - b}`,
        explanation: `合并同类项：${rightValue} - (${b}) = ${rightValue - b}`
      })
      steps.push({
        formula: `x = ${rightValue - b} ÷ ${a}`,
        explanation: `系数化为1：两边同时除以x的系数${a}`
      })
      steps.push({
        formula: `x = ${x}`,
        explanation: `计算得到最终解`
      })
      steps.push({
        formula: `验证：${a}×${x} + ${b} = ${a * x + b} = ${rightValue}`,
        explanation: '将解代入原方程验证，等式成立'
      })
    }

    return {
      type: '一元一次方程',
      steps,
      answer: `x = ${x}`
    }
  } catch (error) {
    return {
      type: '解析错误',
      steps: [{
        formula: problem,
        explanation: '无法解析该方程，请检查格式'
      }],
      answer: '解析失败'
    }
  }
}

/**
 * 求解一元二次方程
 */
const solveQuadraticEquation = (problem, difficulty) => {
  try {
    const normalized = problem.replace('x²', 'x^2')
    const [left] = normalized.split('=')

    // 提取系数 ax^2 + bx + c = 0
    let a = 0, b = 0, c = 0
    const terms = left.replace(/\s/g, '').split(/(?=[+-])/)

    terms.forEach(term => {
      if (term.includes('x^2')) {
        const coef = term.replace('x^2', '')
        a += coef === '' || coef === '+' ? 1 : coef === '-' ? -1 : parseFloat(coef)
      } else if (term.includes('x')) {
        const coef = term.replace('x', '')
        b += coef === '' || coef === '+' ? 1 : coef === '-' ? -1 : parseFloat(coef)
      } else {
        c += parseFloat(term) || 0
      }
    })

    const discriminant = b * b - 4 * a * c
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a)
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a)

    const steps = []

    if (difficulty === 'easy') {
      steps.push({
        formula: problem,
        explanation: '原方程'
      })
      steps.push({
        formula: `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`,
        explanation: '使用求根公式求解'
      })
    } else if (difficulty === 'medium') {
      steps.push({
        formula: problem,
        explanation: '一元二次方程'
      })
      steps.push({
        formula: `a=${a}, b=${b}, c=${c}`,
        explanation: '识别系数'
      })
      steps.push({
        formula: `Δ = b² - 4ac = ${b}² - 4×${a}×${c} = ${discriminant}`,
        explanation: '计算判别式'
      })
      steps.push({
        formula: `x = (-b ± √Δ) / 2a`,
        explanation: '应用求根公式'
      })
      steps.push({
        formula: `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`,
        explanation: '计算两个根'
      })
    } else {
      steps.push({
        formula: problem,
        explanation: '给定的一元二次方程'
      })
      steps.push({
        formula: `${a}x² + ${b}x + ${c} = 0`,
        explanation: `标准形式：a=${a}, b=${b}, c=${c}`
      })
      steps.push({
        formula: `Δ = b² - 4ac`,
        explanation: '判别式公式，用于判断根的性质'
      })
      steps.push({
        formula: `Δ = ${b}² - 4×${a}×${c} = ${b * b} - ${4 * a * c} = ${discriminant}`,
        explanation: '代入计算判别式的值'
      })
      if (discriminant > 0) {
        steps.push({
          formula: `Δ > 0`,
          explanation: '判别式大于0，方程有两个不相等的实数根'
        })
      } else if (discriminant === 0) {
        steps.push({
          formula: `Δ = 0`,
          explanation: '判别式等于0，方程有两个相等的实数根'
        })
      }
      steps.push({
        formula: `x = (-b ± √Δ) / (2a)`,
        explanation: '一元二次方程的求根公式'
      })
      steps.push({
        formula: `x = (${-b} ± √${discriminant}) / ${2 * a}`,
        explanation: '代入a, b和判别式的值'
      })
      steps.push({
        formula: `x₁ = (${-b} + ${Math.sqrt(discriminant).toFixed(2)}) / ${2 * a} = ${x1.toFixed(2)}`,
        explanation: '计算第一个根（取加号）'
      })
      steps.push({
        formula: `x₂ = (${-b} - ${Math.sqrt(discriminant).toFixed(2)}) / ${2 * a} = ${x2.toFixed(2)}`,
        explanation: '计算第二个根（取减号）'
      })
    }

    return {
      type: '一元二次方程',
      steps,
      answer: `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`
    }
  } catch (error) {
    return {
      type: '解析错误',
      steps: [{
        formula: problem,
        explanation: '无法解析该方程，请检查格式'
      }],
      answer: '解析失败'
    }
  }
}

/**
 * 求解分数运算
 */
const solveFraction = (problem, difficulty) => {
  try {
    const parts = problem.split('/')
    if (parts.length !== 2) {
      throw new Error('Invalid fraction format')
    }

    const numerator = parseFloat(parts[0].trim())
    const denominator = parseFloat(parts[1].trim())
    const result = numerator / denominator

    const steps = []

    if (difficulty === 'easy') {
      steps.push({
        formula: problem,
        explanation: '分数除法'
      })
      steps.push({
        formula: `= ${result.toFixed(4)}`,
        explanation: '计算结果'
      })
    } else if (difficulty === 'medium') {
      steps.push({
        formula: problem,
        explanation: '分数形式'
      })
      steps.push({
        formula: `${numerator} ÷ ${denominator}`,
        explanation: '转换为除法'
      })
      steps.push({
        formula: `= ${result.toFixed(4)}`,
        explanation: '执行除法运算'
      })
    } else {
      steps.push({
        formula: problem,
        explanation: '给定的分数'
      })
      steps.push({
        formula: `分子 = ${numerator}, 分母 = ${denominator}`,
        explanation: '识别分数的组成部分'
      })
      steps.push({
        formula: `${numerator} ÷ ${denominator}`,
        explanation: '分数表示分子除以分母'
      })
      steps.push({
        formula: `= ${result.toFixed(4)}`,
        explanation: '执行除法运算得到小数形式'
      })
      if (result % 1 === 0) {
        steps.push({
          formula: `= ${result}`,
          explanation: '结果为整数'
        })
      }
    }

    return {
      type: '分数运算',
      steps,
      answer: result % 1 === 0 ? `${result}` : result.toFixed(4)
    }
  } catch (error) {
    return {
      type: '解析错误',
      steps: [{
        formula: problem,
        explanation: '无法解析该分数，请使用格式：分子/分母'
      }],
      answer: '解析失败'
    }
  }
}

/**
 * 求解百分比问题
 */
const solvePercentage = (problem, difficulty) => {
  try {
    const lowerProblem = problem.toLowerCase()
    let percentage, number, result

    if (lowerProblem.includes('of')) {
      // 格式: 25% of 80
      const parts = lowerProblem.split('of')
      percentage = parseFloat(parts[0].replace('%', '').trim())
      number = parseFloat(parts[1].trim())
      result = (percentage / 100) * number
    } else {
      // 简单百分比
      percentage = parseFloat(problem.replace('%', '').trim())
      result = percentage / 100
    }

    const steps = []

    if (difficulty === 'easy') {
      steps.push({
        formula: problem,
        explanation: '百分比问题'
      })
      steps.push({
        formula: `= ${result}`,
        explanation: '计算结果'
      })
    } else if (difficulty === 'medium') {
      if (lowerProblem.includes('of')) {
        steps.push({
          formula: problem,
          explanation: '百分比乘法'
        })
        steps.push({
          formula: `${percentage}% × ${number}`,
          explanation: '转换为乘法'
        })
        steps.push({
          formula: `${percentage / 100} × ${number}`,
          explanation: '百分比转小数'
        })
        steps.push({
          formula: `= ${result}`,
          explanation: '执行乘法'
        })
      } else {
        steps.push({
          formula: problem,
          explanation: '百分比转换'
        })
        steps.push({
          formula: `${percentage} ÷ 100`,
          explanation: '除以100'
        })
        steps.push({
          formula: `= ${result}`,
          explanation: '得到小数形式'
        })
      }
    } else {
      if (lowerProblem.includes('of')) {
        steps.push({
          formula: problem,
          explanation: '求某数的百分之几'
        })
        steps.push({
          formula: `百分比 = ${percentage}%, 基数 = ${number}`,
          explanation: '识别问题中的百分比和基数'
        })
        steps.push({
          formula: `${percentage}% = ${percentage} / 100 = ${percentage / 100}`,
          explanation: '将百分比转换为小数（除以100）'
        })
        steps.push({
          formula: `${percentage / 100} × ${number}`,
          explanation: '用小数形式乘以基数'
        })
        steps.push({
          formula: `= ${result}`,
          explanation: '执行乘法运算得到最终结果'
        })
        steps.push({
          formula: `答案：${number}的${percentage}%是${result}`,
          explanation: '结论'
        })
      } else {
        steps.push({
          formula: problem,
          explanation: '百分比转小数'
        })
        steps.push({
          formula: `百分比的定义：表示一个数是另一个数的百分之几`,
          explanation: '概念说明'
        })
        steps.push({
          formula: `${percentage}% = ${percentage} ÷ 100`,
          explanation: '百分比转小数的方法：除以100'
        })
        steps.push({
          formula: `= ${result}`,
          explanation: '计算得到小数形式'
        })
      }
    }

    return {
      type: '百分比计算',
      steps,
      answer: `${result}`
    }
  } catch (error) {
    return {
      type: '解析错误',
      steps: [{
        formula: problem,
        explanation: '无法解析该百分比问题'
      }],
      answer: '解析失败'
    }
  }
}

/**
 * 求解基本算术运算
 */
const solveArithmetic = (problem, difficulty) => {
  try {
    const result = eval(problem.replace(/×/g, '*').replace(/÷/g, '/'))

    const steps = []

    if (difficulty === 'easy') {
      steps.push({
        formula: problem,
        explanation: '算术运算'
      })
      steps.push({
        formula: `= ${result}`,
        explanation: '计算结果'
      })
    } else if (difficulty === 'medium') {
      steps.push({
        formula: problem,
        explanation: '给定的算术表达式'
      })
      const normalized = problem.replace(/×/g, '*').replace(/÷/g, '/')
      if (normalized !== problem) {
        steps.push({
          formula: normalized,
          explanation: '转换为标准运算符'
        })
      }
      steps.push({
        formula: `= ${result}`,
        explanation: '按照运算优先级计算'
      })
    } else {
      steps.push({
        formula: problem,
        explanation: '给定的算术表达式'
      })
      steps.push({
        formula: '运算优先级：括号 > 乘除 > 加减',
        explanation: '算术运算的基本规则'
      })
      const normalized = problem.replace(/×/g, '*').replace(/÷/g, '/')
      if (normalized !== problem) {
        steps.push({
          formula: normalized,
          explanation: '将运算符转换为标准形式'
        })
      }
      
      // 尝试分解步骤
      if (problem.includes('+') || problem.includes('-')) {
        const parts = problem.split(/([+\-])/)
        let runningTotal = parseFloat(parts[0])
        steps.push({
          formula: `第一项 = ${parts[0]}`,
          explanation: '从左到右依次计算'
        })
        for (let i = 1; i < parts.length; i += 2) {
          const operator = parts[i]
          const operand = parseFloat(parts[i + 1])
          const prevTotal = runningTotal
          if (operator === '+') {
            runningTotal += operand
            steps.push({
              formula: `${prevTotal} + ${operand} = ${runningTotal}`,
              explanation: `加上 ${operand}`
            })
          } else {
            runningTotal -= operand
            steps.push({
              formula: `${prevTotal} - ${operand} = ${runningTotal}`,
              explanation: `减去 ${operand}`
            })
          }
        }
      }
      
      steps.push({
        formula: `= ${result}`,
        explanation: '最终结果'
      })
    }

    return {
      type: '算术运算',
      steps,
      answer: `${result}`
    }
  } catch (error) {
    return {
      type: '解析错误',
      steps: [{
        formula: problem,
        explanation: '无法解析该算术表达式'
      }],
      answer: '解析失败'
    }
  }
}