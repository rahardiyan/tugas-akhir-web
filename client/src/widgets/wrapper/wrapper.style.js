import styled, { createGlobalStyle } from 'styled-components'

import { InnerHeight, InnerWidth } from '../../helpers'

export const Wrapper = createGlobalStyle`
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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  `
export const Container = styled.div`
  width: ${InnerWidth}px;
  height: ${InnerHeight}px;
`
