import type { Meta, StoryObj } from '@storybook/react'
import Chats from './Chats'

const meta: Meta<typeof Chats> = {
  title: 'Page/Chats',
  component: Chats,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Stories = StoryObj<typeof Chats>

export const Default: Stories = {}
