import { setup } from 'goober'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from '~/components/App'

const container = document.getElementById('app')

if (!container) throw new Error('Oops, root element is missing.')

// Setup for goober
setup(React.createElement)

const root = createRoot(container)
root.render(<App />)
