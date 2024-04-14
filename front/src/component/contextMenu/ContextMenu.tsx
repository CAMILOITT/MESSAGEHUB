import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import type { DropDownMenuProps } from '../../type/dropdownMenu/interface'
import css from './ContextMenu.module.css'

interface ContextMenuProps {
  listOption: DropDownMenuProps[]
  parentSize?: boolean
}
export interface ContextMenuRef {
  openMenu: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const ContextMenu = forwardRef<ContextMenuRef, ContextMenuProps>(
  ({ listOption, parentSize }, ref) => {
    const ContextMenu = useRef<HTMLUListElement | null>(null)

    function openMenu(e: React.MouseEvent<HTMLElement, MouseEvent>) {
      e.preventDefault()

      const separationX = 5
      const separationY = 5

      const { clientX, clientY } = e
      if (!ContextMenu.current) return
      ContextMenu.current.style.visibility = 'visible'

      ContextMenu.current.style.top = `${clientY + separationY}px`

      if (!parentSize) {
        ContextMenu.current.style.left = `${clientX + separationX}px`
        ContextMenu.current.style.right = ''
        return
      }

      const { width: widthParent, left: leftParent } =
        e.currentTarget.getBoundingClientRect()
      const { width: widthMenu } = ContextMenu.current.getBoundingClientRect()

      const diferencieWidth = widthParent - widthMenu

      if (clientX - leftParent > widthParent - diferencieWidth) {
        ContextMenu.current.style.left = ''
        ContextMenu.current.style.right = `${
          widthParent + leftParent + separationX - clientX
        }px`
        return
      }
      ContextMenu.current.style.left = `${clientX + separationX}px`
      ContextMenu.current.style.right = ''
    }

    function closeMenu() {
      if (!ContextMenu.current) return
      ContextMenu.current.style.visibility = 'hidden'
    }

    useEffect(() => {
      window.addEventListener('click', closeMenu)
      return () => {
        window.removeEventListener('click', closeMenu)
      }
    })

    useImperativeHandle(ref, () => {
      return {
        openMenu,
      }
    })

    return (
      <ul ref={ContextMenu} className={css.contextMenu}>
        {listOption.map((option, key) => (
          <li key={key} className={css.optionMenu}>
            <button onClick={option.event} className={css.eventMenu}>
              {option.name}
            </button>
          </li>
        ))}
      </ul>
    )
  },
)
export default ContextMenu
