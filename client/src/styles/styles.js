import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-rendering: optimizeLegibility;
    color: ${({ theme }) => theme.primaryLight};
    background: ${({ theme }) => theme.primaryDark};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  h1 {
    text-align: center;
  }
  `
export default GlobalStyles
