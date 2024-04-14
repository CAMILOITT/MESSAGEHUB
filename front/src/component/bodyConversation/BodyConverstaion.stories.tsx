import BodyConversation from './BodyConversation'
import { rest } from 'msw'
import type { Meta, StoryObj } from '@storybook/react'
import { URL_API } from '../../const/env'

const meta: Meta<typeof BodyConversation> = {
  title: 'Component/BodyConversation',
  component: BodyConversation,
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [
        rest.post(`${URL_API}/getMessages`, (_, res, ctx) => {
          return res(
            ctx.json({
              id_sender: '123414',
              id_receiver: '123415',
              message: 'lista de mensajes',
              _id: '',
            }),
          )
        }),
      ],
    },
  },
}

export default meta

type Story = StoryObj<typeof BodyConversation>

export const Default: Story = {}
