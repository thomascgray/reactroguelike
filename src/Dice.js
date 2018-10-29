import DiceExpression from 'dice-expression-evaluator'

export default function (expression) {
    const d = new DiceExpression(expression);
    const result = d();
    return result < 1 ? 1 : result;
}