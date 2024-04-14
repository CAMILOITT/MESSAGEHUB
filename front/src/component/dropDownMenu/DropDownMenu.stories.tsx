import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'
import MoreIcon from '../../assets/icons/MoreIcon'
import DropDownMenu from './DropDownMenu'
import css from './DropDownMenu.module.css'

const meta: Meta<typeof DropDownMenu> = {
  title: 'Component/DropDownMenu',
  component: DropDownMenu,
  args: {
    listOption: [
      {
        action: fn(),
        name: 'option1',
      },
      {
        action: fn(),
        name: 'option2',
      },
      {
        action: fn(),
        name: 'option3',
      },
    ],
    icon: <MoreIcon />,
    direction: {
      x: 'left',
      y: 'bottom',
    },
  },
  parameters: { layout: 'centered' },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)

    await step('expandir menu', async () => {
      const button = canvas.getByRole('button', {
        name: accessibleName => accessibleName === 'Abrir Menú',
      })
      await userEvent.click(button)
      const list = canvas.getByRole('list')

      expect(list).toHaveClass(css.openMenu)
    })

    await step('ejecutando accion', async () => {
      const btnAction = canvas.getByRole('button', { name: 'option1' })
      const itemOption = args.listOption[0]

      await userEvent.click(btnAction)
      expect(itemOption.action).toHaveBeenCalled()
    })

    await step('cerrar menu', async () => {
      const button = canvas.getByRole('button', {
        name: accessibleName => accessibleName === 'Abrir Menú',
      })
      await userEvent.click(button)
      const list = canvas.getByRole('list')
      expect(list).not.toHaveClass(css.openMenu)
    })
  },
}

export default meta

type Story = StoryObj<typeof DropDownMenu>

export const Default: Story = {}
