import type { Meta, StoryObj } from '@storybook/react'
import InfoAccount from './InfoAccount'

const meta: Meta<typeof InfoAccount> = {
  title: 'component/InfoAccount',
  component: InfoAccount,
  args: {
    name: 'Camilo Torres',
    description: 'hola soy nuevo en la plataforma',
    edit: false,
    imgAvatar: '',
    setListMessageInfo: () => [],
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Stories = StoryObj<typeof InfoAccount>

export const Default: Stories = {}
