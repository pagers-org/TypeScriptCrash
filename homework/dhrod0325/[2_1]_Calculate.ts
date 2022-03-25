const ERROR_MSG = {
  INVALID_TYPE: (TYPE: string) => `유효하지 않은 TYPE : [${TYPE}] 입니다`,
  INVALID_VALUE: (prevValue: unknown, nextValue: unknown, index: number) =>
    `잘못된 값입니다 prevValue : ${prevValue} nextValue : ${nextValue} index: ${index}`,
};

type OperationType = '+' | '-' | '*' | '/';

const OPERATIONS: OperationType[] = ['*', '/', '-', '+'];

type CalcType = 'add' | 'sub' | 'mul' | 'div' | 'calc' | OperationType;

type CalcValue = string | number;

interface Calculator {
  calc(num1: CalcValue, num2: CalcValue, ...args: CalcValue[]): number;
}

class AddCalculator implements Calculator {
  public calc(num1: number, num2: number): number {
    return +num1 + +num2;
  }
}

class SubCalculator implements Calculator {
  public calc(num1: number, num2: number): number {
    return +num1 - +num2;
  }
}

class MulCalculator implements Calculator {
  public calc(num1: number, num2: number): number {
    return +num1 * +num2;
  }
}

class DivCalculator implements Calculator {
  public calc(num1: number, num2: number): number {
    return +num1 / +num2;
  }
}

class CalcCalculator implements Calculator {
  private values: CalcValue[] = [];

  public calc(...numbers: CalcValue[]): number {
    this.values = <number[]>[...numbers];

    OPERATIONS.forEach(operation => {
      this.values.forEach((value, index) => {
        if (value !== operation) return;

        try {
          const calcValue = this.calcByIndex(operation, this.values, index);
          const indexAt = index - 1;

          //계산 후 값을 삭제하고 그 자리를 계산된 값으로 교체함
          this.removeValuesAtTo(indexAt, 3);
          this.insertValueAt(indexAt, calcValue);
        } catch (e) {
          console.log(e);
        }
      });
    });

    return (this.values.length > 0 && this.values[0]) as number;
  }

  private removeValuesAtTo(at: number, to: number): void {
    this.values.splice(at, to);
  }

  private insertValueAt(at: number, value: number): void {
    this.values.splice(at, 0, value);
  }
  private calcByIndex(
    operation: OperationType,
    values: CalcValue[],
    index: number,
  ): number {
    const calculator = CalculatorFactory.createCalculator(<CalcType>operation);

    const prevIndex = index - 1;
    const nextIndex = index + 1;

    const prevValue = values[prevIndex];
    const nextValue = values[nextIndex];

    return calculator.calc(prevValue, nextValue);
  }
}

class CalculatorFactory {
  private static calculators = this.createCalculators();

  private static createCalculators() {
    const calculators = {
      add: new AddCalculator(),
      sub: new SubCalculator(),
      mul: new MulCalculator(),
      div: new DivCalculator(),
      calc: new CalcCalculator(),
    };

    return {
      ...calculators,
      '+': calculators.add,
      '-': calculators.sub,
      '*': calculators.mul,
      '/': calculators.div,
    };
  }

  private static isCalcType(type: CalcType): boolean {
    return Object.getOwnPropertyNames(this.calculators).includes(type);
  }

  public static createCalculator(type: CalcType): Calculator {
    if (!this.isCalcType(type)) {
      throw new Error(ERROR_MSG.INVALID_TYPE('CalcType'));
    }

    return this.calculators[type];
  }
}

function calculate(
  type: CalcType,
  num1: CalcValue,
  num2: CalcValue,
  ...numbers: CalcValue[]
): number {
  const calculator = CalculatorFactory.createCalculator(type);
  return calculator.calc(num1, num2, ...numbers);
}

console.log(calculate('+', 1, 3)); // 4
console.log(calculate('sub', '3', 2)); // 1
console.log(calculate('mul', 6, '9')); // 54
console.log(calculate('div', '5', '4')); // 1
console.log(calculate('calc', 6, '-', 4, '*', 12, '/', 6, '+', 19)); // 17
