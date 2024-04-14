import type { Meta, StoryObj } from '@storybook/react'
import Avatar from './Avatar'
import { expect, within } from '@storybook/test'

const meta: Meta<typeof Avatar> = {
  title: 'component/Avatar',
  component: Avatar,
  args: {
    nick: 'Javier',
    imgAvatar: '',
  },
  parameters: {
    layout: 'centered',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = await canvas.findByRole('img')
    expect(img).toBeInTheDocument()
  },
}

export default meta

type Stories = StoryObj<typeof Avatar>

export const Default: Stories = {}
