import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import type { MessageInfoApp } from '../../type/messagesApp/interface'
import type { StatusMessageInfoApp } from '../../type/messagesApp/type'
import Button from '../../ui/button/Button'
import MessagesInfoApp from './MessagesInfoApp'
import { within, userEvent, expect } from '@storybook/test'

const messages: Record<StatusMessageInfoApp, Omit<MessageInfoApp, 'id'>> = {
  success: { status: 'success', message: 'proceso exitoso' },
  loading: {
    status: 'loading',
    message: 'cargando',
  },
  error: { status: 'error', message: 'proceso fallido' },
  warning: {
    status: 'warning',
    message: 'peligro',
  },
  info: { status: 'info', message: 'información del proceso' },
}

const listStatus: StatusMessageInfoApp[] = [
  'success',
  'loading',
  'error',
  'warning',
  'info',
]

const meta: Meta<typeof MessagesInfoApp> = {
  title: 'Component/MessagesInfoApp',
  component: MessagesInfoApp,
  args: {
    listMessage: [
      { status: 'success', message: 'proceso exitoso', id: '1' },
      { status: 'loading', message: 'cargando proceso', id: '2' },
      { status: 'error', message: 'proceso fallido', id: '3' },
    ],
    setListMessage: list => list,
    timeWait: 5000,
    maxMessage: 5,
  },
  decorators: [
    Story => {
      const [listMessage, setListMessage] = useState<MessageInfoApp[]>([])

      function fillList() {
        setListMessage(oldValue => {
          const newValue = [...oldValue]
          const index: StatusMessageInfoApp =
            listStatus[Math.floor(Math.random() * listStatus.length)]
          newValue.push({
            ...messages[index],
            id: crypto.randomUUID(),
          })
          return newValue
        })
      }

      return (
        <div>
          <Story args={{ listMessage, setListMessage }} />
          <Button onClick={fillList}>crear notificación aleatoria</Button>
        </div>
      )
    },
  ],

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    await userEvent.click(button)
    expect(await canvas.findByRole('notification')).toBeInTheDocument()
  },
}

export default meta

type Stories = StoryObj<typeof MessagesInfoApp>

export const Default: Stories = {}
