type OperatorAdd = 'add' | '+';
type OperatorSub = 'sub' | '-';
type OperatorMul = 'mul' | '*';
type OperatorDiv = 'div' | '/';

type Operator = OperatorAdd | OperatorSub | OperatorMul | OperatorDiv;

type StringNumberArray = (string | number)[];

type OperatorProps = {
  [key in Operator]: (left: number, right: number) => number;
};

type PriorityOperator = {
  [key: string]: number;
};

type CalculateProps = (
  operator: Operator | 'calc',
  ...expressions: StringNumberArray
) => number;

const REGEXP_OPERATOR = /(?<=\d)([+\-*/])/g;

const add = (left: number, right: number) => left + right;
const sub = (left: number, right: number) => left - right;
const mul = (left: number, right: number) => left * right;
const div = (left: number, right: number) => Math.trunc(left / right);

const priorityOperator: PriorityOperator = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
};

const operators: OperatorProps = {
  add,
  sub,
  mul,
  div,
  '+': add,
  '-': sub,
  '*': mul,
  '/': div,
};

const calculate: CalculateProps = (inputOperator, ...expressions) => {
  const parsed = expressions.join('').split(REGEXP_OPERATOR);

  const findOperatorPriorityIndex = (priority: number) => {
    return parsed.findIndex(
      expression => priorityOperator[expression] === priority,
    );
  };

  const getOperatorIndex = () => {
    let operatorIndex = findOperatorPriorityIndex(2);
    operatorIndex =
      operatorIndex === -1 ? findOperatorPriorityIndex(1) : operatorIndex;
    return [operatorIndex - 1, operatorIndex, operatorIndex + 1];
  };

  const getParsedExpression = () => {
    const [startIndex, operatorIndex, endIndex] = getOperatorIndex();
    const operator = parsed[operatorIndex];
    return {
      startIndex,
      leftOperand: Number(parsed[startIndex]),
      compute: operators[operator as Operator],
      rightOperand: Number(parsed[endIndex]),
    };
  };

  const calc = (): number => {
    while (parsed.length > 1) {
      const { startIndex, leftOperand, compute, rightOperand } =
        getParsedExpression();
      const result = compute(leftOperand, rightOperand);
      parsed.splice(startIndex, 3, `${result}`);
    }
    return Number(parsed[0]);
  };

  try {
    if (expressions.length > 2) return calc();

    const operator = operators[inputOperator as Operator];
    return operator(Number(expressions[0]), Number(expressions[1]));
  } catch (error) {
    console.error(error);
    return -99999;
  }
};

console.log(calculate('add', 1, 3)); // 4
console.log(calculate('sub', '3', 2)); // 1
console.log(calculate('mul', 6, '9')); // 54
console.log(calculate('div', '5', '4')); // 1
console.log(calculate('calc', 6, '-', 4, '*', 12, '/', 6, '+', 19)); // 17
