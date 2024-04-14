import type { Meta, StoryObj } from '@storybook/react';
import Conversation from './Conversation';

const meta: Meta<typeof Conversation> = {
  title: 'Component/Conversation',
  component: Conversation,
  parameters: { layout: 'fullscreen' },
  args: {
    messages: [
      {
        _id: '1',
        id_receiver: '1',
        id_sender: '2',
        message: 'hola como estas',
      },
      {
        _id: '2',
        id_receiver: '2',
        id_sender: '',
        message: 'bien y tu??',
      },
      {
        _id: '1',
        id_receiver: '1',
        id_sender: '2',
        message: 'super feliz',
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof Conversation>;

export const Default: Story = {};
