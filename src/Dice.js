import DiceExpression from 'dice-expression-evaluator'

export default function (expression) {
 const d = new DiceExpression(expression);
 return d();
}