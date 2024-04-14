import type { Meta, StoryObj } from '@storybook/react'
import HeaderMessage from './HeaderMessage'

const meta: Meta<typeof HeaderMessage> = {
  title: 'component/HeaderMessage',
  component: HeaderMessage,
  args: {
    infoChat: {
      _id: '1234',
      nick: 'Javier',
      img_avatar: '',
    },
  },
}

export default meta

type Stories = StoryObj<typeof HeaderMessage>

export const Default: Stories = {}
