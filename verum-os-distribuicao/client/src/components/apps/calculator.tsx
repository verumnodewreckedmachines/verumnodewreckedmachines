import { useState } from 'react';
import { GlassPanel } from '@/components/ui/glass-panel';
import { Button } from '@/components/ui/button';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      clear();
    } else if (value === '=') {
      performCalculation();
    } else if (['+', '-', '×', '÷'].includes(value)) {
      inputOperation(value);
    } else if (value === '±') {
      setDisplay(String(parseFloat(display) * -1));
    } else if (value === '%') {
      setDisplay(String(parseFloat(display) / 100));
    } else {
      inputNumber(value);
    }
  };

  return (
    <GlassPanel className="p-6 w-80">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <i className="fas fa-calculator text-verum-purple mr-2"></i>
          VERUM Calculator
        </h3>
      </div>
      
      <div className="bg-verum-dark p-4 rounded-lg mb-4">
        <div className="text-right text-2xl font-mono text-white min-h-[40px] flex items-center justify-end">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {buttons.flat().map((button, index) => (
          <Button
            key={index}
            onClick={() => handleButtonClick(button)}
            variant={['C', '±', '%', '÷', '×', '-', '+', '='].includes(button) ? 'secondary' : 'default'}
            className={`h-12 text-lg font-semibold ${
              button === '0' ? 'col-span-2' : ''
            } ${
              ['÷', '×', '-', '+', '='].includes(button) 
                ? 'bg-verum-purple hover:bg-verum-purple/80' 
                : button === 'C' 
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-verum-glass hover:bg-verum-glass/80'
            }`}
          >
            {button}
          </Button>
        ))}
      </div>
    </GlassPanel>
  );
}