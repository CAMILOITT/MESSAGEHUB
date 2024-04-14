import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import type { MessageInfoApp } from '../../type/messagesApp/interface';
import type { StatusMessageInfoApp } from '../../type/messagesApp/type';
import Button from '../../ui/button/Button';
import MessagesInfoApp from './MessagesInfoApp';

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
};

const listStatus: StatusMessageInfoApp[] = [
  'success',
  'loading',
  'error',
  'warning',
  'info',
];

const meta: Meta<typeof MessagesInfoApp> = {
  title: 'Component/MessagesInfoApp',
  component: MessagesInfoApp,
  args: {
    listMessage: [
      { status: 'success', message: 'proceso exitoso', id: '1' },
      { status: 'loading', message: 'cargando proceso', id: '2' },
      { status: 'error', message: 'proceso fallido', id: '3' },
    ],
    setListMessage: (list) => list,
    timeWait: 5000,
    maxMessage: 5,
  },
  decorators: [
    (Story) => {
      const [listMessage, setListMessage] = useState<MessageInfoApp[]>([]);

      function fillList() {
        setListMessage((oldValue) => {
          const newValue = [...oldValue];
          const index: StatusMessageInfoApp =
            listStatus[Math.floor(Math.random() * listStatus.length)];
          newValue.push({
            ...messages[index],
            id: crypto.randomUUID(),
          });
          return newValue;
        });
      }

      return (
        <div>
          <Story args={{ listMessage, setListMessage }} />
          <Button onClick={fillList}>crear notificación aleatoria</Button>
        </div>
      );
    },
  ],

  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await step('crear una notificación', async () => {
      await userEvent.click(button);
      expect(await canvas.findByRole('listitem')).toBeInTheDocument();
      expect((await canvas.findByRole('list')).childElementCount).toBe(1);
    });

    await step('crear varias notificaciones', async () => {
      for (let i = 0; i < (args.maxMessage || 5); i++) {
        await userEvent.click(button);
      }

      expect((await canvas.findByRole('list')).childElementCount).toBe(
        args.maxMessage
      );
    });
  },
};

export default meta;

type Stories = StoryObj<typeof MessagesInfoApp>;

export const Default: Stories = {};
