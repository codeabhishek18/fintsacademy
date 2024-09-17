export const calculatePercentile = (score, questions) =>
{
    return Math.ceil((score*100)/questions)
}

export const calculateResult = (score, questions) =>
{
    const result = calculatePercentile(score, questions) >= 75 ? 'Qualified' : 'Fell short'
    return result
}