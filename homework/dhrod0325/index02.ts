type CalcType = 'add' | 'sub' | 'mul' | 'div' | 'calc';
type OperationType = '+' | '-' | '*' | '/' | string | number;

type CalcValueType = string | number;

interface Calculator {
  calc(
    num1: CalcValueType,
    num2: CalcValueType,
    ...args: CalcValueType[]
  ): number;
}

class AddCalculator implements Calculator {
  calc(num1: number, num2: number): number {
    return +num1 + +num2;
  }
}

class SubCalculator implements Calculator {
  calc(num1: number, num2: number): number {
    return +num1 - +num2;
  }
}

class MulCalculator implements Calculator {
  calc(num1: number, num2: number): number {
    return +num1 * +num2;
  }
}

class DivCalculator implements Calculator {
  calc(num1: number, num2: number): number {
    return +num1 / +num2;
  }
}

class MultiplexCalculator implements Calculator {
  calc(...numbers: CalcValueType[]): number {
    const values: CalcValueType[] = numbers.filter((_value, i) => i % 2 === 0);
    const operations: OperationType[] = numbers.filter(
      (_value, i) => i % 2 === 1,
    );

    let result = 0;

    for (let i = 0; i < values.length; i += 2) {
      const num1 = values[i];
      const operation: OperationType = operations[i];
      const num2 = values[i + 1];

      console.log(num1, operation, num2);

      const calculator = CalculatorFactory.createCalculator(operation);

      result += calculator ? calculator.calc(num1, num2) : 0;
    }

    console.log('result', result);

    return 0;
  }
}

class CalculatorFactory {
  static add = new AddCalculator();
  static sub = new SubCalculator();
  static mul = new MulCalculator();
  static div = new DivCalculator();

  static createCalculator(type: CalcType | OperationType): Calculator | null {
    switch (type) {
      case 'add':
      case '+':
        return this.add;
      case 'sub':
      case '-':
        return this.sub;
      case 'mul':
      case '*':
        return this.mul;
      case 'div':
      case '/':
        return this.div;
    }

    return null;
  }
}
console.log('. ');
console.log('. ');
console.log('. ');
console.log('. ');

function solution(s: string): number {
  const stack: any[] = [];

  for (const x of s) {
    console.log(x);
    // @ts-ignore
    if (!isNaN(x)) stack.push(+x);
    else {
      const rt = stack.pop();
      const lt = stack.pop();
      if (x === '+') stack.push(lt + rt);
      else if (x === '-') stack.push(lt - rt);
      else if (x === '*') stack.push(lt * rt);
      else if (x === '/') stack.push(lt / rt);
    }
  }

  return +stack;
}

console.log(solution('6-4*12/6+19'));
