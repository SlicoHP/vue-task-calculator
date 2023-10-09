 const OPERATIONS: string[] = ['/', '*', '-', '+']
 const DIVISION_BY_ZERO_ERROR = "Not a Number.";

interface CalculatorButton {
  text: string
  classes?: string
}

 const buttons: CalculatorButton[] = [
  { text: 'C', classes: 'text-black dark:!text-green-400' },
  { text: '/', classes: 'col-start-4 !bg-green-500 hover:!bg-green-600' },
  { text: '7' },
  { text: '8' },
  { text: '9' },
  { text: '*', classes: '!bg-green-500 hover:!bg-green-600' },
  { text: "4" },
  { text: "5" },
  { text: "6" },
  { text: '-', classes: '!bg-green-500 hover:!bg-green-600' },
  { text: "1" },
  { text: "2" },
  { text: "3" },
  { text: '+', classes: '!bg-green-500 hover:!bg-green-600' },
  { text: "0", classes: ' rounded-bl-xl' },
  { text: '.', classes: 'col-start-3' },
  { text: '=', classes: '!bg-green-500 hover:!bg-green-600' }
]

export {
  OPERATIONS,
  DIVISION_BY_ZERO_ERROR,
  buttons
}