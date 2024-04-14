import type { Meta, StoryObj } from '@storybook/react'
import SessionUser from './SessionUser'

const meta: Meta<typeof SessionUser> = {
  title: 'Page/SessionUser',
  component: SessionUser,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Stories = StoryObj<typeof SessionUser>

export const Default: Stories = {}
