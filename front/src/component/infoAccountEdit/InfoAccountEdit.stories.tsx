import type { Meta, StoryObj } from '@storybook/react'
import {
  expect,
  fireEvent,
  fn,
  userEvent,
  waitFor,
  within,
} from '@storybook/test'
import InfoAccountEdit from './InfoAccountEdit'
import css from './InfoAccountEdit.module.css'

const meta: Meta<typeof InfoAccountEdit> = {
  title: 'component/InfoAccountEdit',
  component: InfoAccountEdit,
  args: {
    title: 'Descripción',
    description: 'descripción del lugar donde se utiliza',
    canEdit: true,
    urlFetch: '',
    setListMessageInfo: fn(),
  },
  parameters: { layout: 'centered' },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement)
    await step('editar descripción', async () => {
      expect(
        await canvas.findByRole('button', { name: /editar/i }),
      ).toBeVisible()
      expect(await canvas.findByRole('paragraph')).not.toHaveClass(css.infoEdit)

      await userEvent.click(
        await canvas.findByRole('button', { name: /editar/i }),
      )
      expect(await canvas.findByRole('paragraph')).toHaveAttribute(
        'contenteditable',
        'true',
      )
      expect(await canvas.findByRole('paragraph')).toHaveClass(css.infoEdit)

      expect(await canvas.findByRole('button', { name: /ver/i })).toBeVisible()

      await userEvent.click(await canvas.findByRole('paragraph'))

      await userEvent.type(
        await canvas.findByRole('paragraph'),
        `{backspace>${
          (await canvas.findByRole('paragraph')).textContent?.length
        }}nueva descripción`,
      )

      expect(await canvas.findByRole('paragraph')).toHaveTextContent(
        'nueva descripción',
      )
    })

    await step('enviar datos', async () => {
      await fireEvent.click(await canvas.findByRole('button', { name: /ver/i }))
      // expect(
      //   await canvas.findByRole('button', { name: /ver/i })
      // ).not.toBeInTheDocument()
      // expect(
      //   await canvas.findByRole('button', { name: /editar/i })
      // ).toBeVisible()
      await waitFor(async () => {
        expect(await canvas.findByRole('paragraph')).not.toHaveClass(
          css.infoEdit,
        )

        expect(args.setListMessageInfo).toHaveBeenCalled()
      })
    })
  },
}

export default meta

type Stories = StoryObj<typeof InfoAccountEdit>

export const Default: Stories = {}
