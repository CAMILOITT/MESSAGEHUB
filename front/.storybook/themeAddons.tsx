// import { addons, types } from '@storybook/manager-api'
// import React from 'react'
// import { IconButton } from '@storybook/components'

// const nameAddon = 'change-theme'

// addons.register(nameAddon, api => {
//   addons.add(nameAddon, {
//     title: nameAddon,
//     type: types.TOOL,
//     match: ({ viewMode }) => viewMode === 'story',
//     render({ active }) {
//       const channel = addons.getChannel()
//       return (
//         <IconButton
//           key={nameAddon}
//           title="Theming"
//           onClick={() => {
//             const isDarkTheme =
//               document.body.getAttribute('data-theme') === 'dark'

//             console.log(active)
//             console.log('theme', document.body)

//             if (isDarkTheme) {
//               document.body.removeAttribute('data-theme')
//               channel.emit(`${nameAddon}/unsetDarkTheme`)
//             } else {
//               document.body.setAttribute('data-theme', 'dark')
//               channel.emit(`${nameAddon}/setDarkTheme'`)
//             }
//           }}
//         >
//           color
//         </IconButton>
//       )
//     },
//     // render: function Theme() {
//     //   // const channel = addons.getChannel()

//     //   // const darkThemeButton = document.createElement('button')
//     //   // darkThemeButton.textContent = 'Toggle Dark Theme'
//     //   // darkThemeButton.addEventListener('click', () => {
//     //   //   const isDarkTheme = document.body.getAttribute('data-theme') === 'dark'
//     //   //   if (isDarkTheme) {
//     //   //     document.body.removeAttribute('data-theme')
//     //   //     channel.emit('my-dark-theme-addon/unsetDarkTheme')
//     //   //   } else {
//     //   //     document.body.setAttribute('data-theme', 'dark')
//     //   //     channel.emit('my-dark-theme-addon/setDarkTheme')
//     //   //   }
//     //   // })

//     //   // return darkThemeButton

//     //   return (
//     //     <button
//     //       onClick={() => {
//     //         const isDarkTheme =
//     //           document.body.getAttribute('data-theme') === 'dark'
//     //         if (isDarkTheme) {
//     //           document.body.removeAttribute('data-theme')
//     //           channel.emit('my-dark-theme-addon/unsetDarkTheme')
//     //         }
//     //       }}
//     //     >
//     //       Toggle Dark Theme
//     //     </button>
//     //   )
//     // },
//   })
//   // const channel = api.getChannel()

//   // if (!channel) return
//   // channel.on(`${nameAddon}/setDarkTheme`, () => {
//   //   document.documentElement.setAttribute('data-theme', 'dark')
//   // })
//   // channel.on(`${nameAddon}/setLightTheme`, () => {
//   //   document.documentElement.setAttribute('data-theme', 'light')
//   // })
// })
