import { addons, types, useGlobals } from '@storybook/manager-api'
import { IconButton } from '@storybook/components'
import React, { useCallback } from 'react'
import themeDocs from './themeDocs'

addons.setConfig({
  theme: themeDocs,
})

const ADDON_PANEL = 'change-theme/panel'
export const ADDON_ID = 'storybook/theme-switch'
export const TOOL_ID = `${ADDON_ID}/tool`
export const PANEL_ID = `${ADDON_ID}/panel`
export const TAB_ID = `${ADDON_ID}/tab`
export const PARAM_KEY = 'myAddonParameter'

export const EVENTS = {
  RESULT: `${ADDON_ID}/result`,
  REQUEST: `${ADDON_ID}/request`,
  CLEAR: `${ADDON_ID}/clear`,
}

// addons.register(ADDON_ID, api => {
//   // api.setGlobalKey(ADDON_ID)
//   addons.add(ADDON_PANEL, {
//     title: ADDON_ID,
//     type: types.TOOL,
//     match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
//     render: ({ active }) => {
//       // if (!active) return null

//       const channel = addons.getChannel()

//       const [{ isDarkMode }, updateGlobals] = useGlobals()

//       const toggleMyTool = useCallback(() => {
//         console.log(active)
//         console.log('theme', isDarkMode)

//         const rootElement = document.querySelector('body')

//         if (rootElement !== null) {
//           rootElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
//         }

//         updateGlobals({
//           isDarkMode: !isDarkMode,
//         })
//       }, [isDarkMode])
//       return (
//         <IconButton
//           key={TOOL_ID}
//           active={isDarkMode}
//           title="Theme"
//           onClick={toggleMyTool}
//         >
//           <div>Theme</div>
//         </IconButton>
//       )
//     },
//   })
// })
