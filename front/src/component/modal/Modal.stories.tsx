import type { Meta, StoryObj } from '@storybook/react'
import { useRef } from 'react'
import Modal, { type MethodModal } from './Modal'
import Button from '../../ui/button/Button'
import { expect, userEvent, waitFor, within } from '@storybook/test'

const meta: Meta<typeof Modal> = {
  title: 'Component/Modal',
  component: Modal,
  render: () => {
    const RefModal = useRef<MethodModal | null>(null)

    function open() {
      if (!RefModal.current) return
      RefModal.current.openModal()
    }

    return (
      <>
        <Button onClick={open}>Open</Button>
        <Modal ref={RefModal} children={<p> Soy un Modal </p>} />
      </>
    )
  },

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('abrir modal', async () => {
      const button = canvas.getByRole('button')
      await userEvent.click(button)
      await waitFor(() =>
        expect(canvas.getByText('Soy un Modal')).toBeVisible(),
      )
    })

    await step('cerrar modal', async () => {
      const button = canvas.getByRole('button', { name: 'Cerrar Modal' })
      await userEvent.click(button)
      expect(await canvas.findByText('Soy un Modal')).not.toBeVisible()
    })
  },
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {}
