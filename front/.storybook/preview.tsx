import type { Preview } from '@storybook/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import '../src/styles/index.css'

// import { mswLoader } from 'msw-storybook-addon'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => {
      document.querySelector('html')?.setAttribute('data-theme', 'dark')
      return (
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      )
    },
  ],
  globalTypes: {
    // theme: {
    //   description: 'Global theme for components',
    //   defaultValue: 'light',
    //   toolbar: {
    //     title: 'Theme',
    //     icon: 'circlehollow',
    //     items: ['light', 'dark'],
    //   },
    // },
  } /* loaders: [mswLoader] */,
}

export default preview
