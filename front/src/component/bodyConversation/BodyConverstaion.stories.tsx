import BodyConversation from './BodyConversation'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof BodyConversation> = {
  title: 'Component/BodyConversation',
  component: BodyConversation,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof BodyConversation>

export const Default: Story = {}
