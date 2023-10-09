# Calculator

Calculator built with Vue 3 and using TailwindCSS.
I tried keeping the functionality as similar as the MacOS calculator

## Features

- Light / dark mode (dark mode by default).
- Use the keyboard:
    - Enter: Like pressing equal (=)
    - ESC: Reset the calculator
    - Any number: Add the number to the screen.
    - Dot: Acts as a decimal.
- Adjust font size when output is too long.
- Keep pressing equals button to perform the latest operation.
- Handle division by zero. Show "Not a Number" and recover gracefully.

## Clone the repository

Clone the repository as you usually do.

## Install dependencies

Make sure you are using node v18. Then run:

```
yarn install
```

## Run the project

```
yarn dev
```