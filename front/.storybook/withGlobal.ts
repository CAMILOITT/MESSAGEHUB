import { useGlobals } from '@storybook/manager-api'
import type { StoryContext, StoryFn as StoryFunction } from '@storybook/types'
import { useEffect } from 'react'

export const withGlobals = (StoryFn: StoryFunction, context: StoryContext) => {
  const [{ isDarkMode }] = useGlobals()
  useEffect(() => {
    setTheme({
      isDarkMode,
    })
  }, [isDarkMode])

  return StoryFn(context, context)
}

function setTheme(state: { isDarkMode: boolean }) {
  const bodyElement = document.querySelector('body')
  const { isDarkMode } = state
  if (bodyElement !== null) {
    bodyElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }
}
