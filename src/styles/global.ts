import { createGlobalStyles } from 'goober/global'

const globalStyles = createGlobalStyles`
  :root {
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    --font-size: 16px;

    --color-white: #fff;
    --color-black: #000;
    --color-gray-0: #fafafa;
    --color-gray-1: #eee;
    --color-gray-2: #bdbdbd;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  p {
    margin: 0;
  }

  input,
  button,
  textarea,
  select {
    appearance: none;
    display: inline-block;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border-radius: 0;
    border: none;
    color: inherit;
    font-family: inherit;
    line-height: 1.15;
    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
  
  html {
    font-size: var(--font-size);
  }

  body {
    margin: 0;
    background-color: var(--color-white);
    color: var(--color-black);
    font-family: var(--font-family);
    font-size: 1rem;
    font-weight: normal;
    line-height: 1.15;
  }

  button {
    cursor: pointer;
  }
  
  img {
    max-width: 100%;
    vertical-align: middle;
  }
`

export default globalStyles
