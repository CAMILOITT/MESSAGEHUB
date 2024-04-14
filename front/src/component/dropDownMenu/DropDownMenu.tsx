import { useEffect, useRef, useState } from 'react'
import css from './DropDownMenu.module.css'
import Button from '../../ui/button/Button'

interface DropDownMenuProps {
  listOption: { action: () => void; name: string }[]
  direction: { x: 'left' | 'right'; y: 'top' | 'bottom' }
  icon: JSX.Element
  classStyle?: string
}

export default function DropDownMenu({
  listOption,
  direction,
  icon,
  classStyle,
}: DropDownMenuProps) {
  const [openMenu, setOpenMenu] = useState(false)

  const refDownMenu = useRef<HTMLUListElement | null>(null)
  const refBtn = useRef<HTMLButtonElement | null>(null)

  function closeDownMenu(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (
      !refDownMenu.current?.contains(target) &&
      !refBtn.current?.contains(target)
    )
      setOpenMenu(false)
  }

  useEffect(() => {
    window.addEventListener('click', closeDownMenu)
    return () => {
      window.removeEventListener('click', closeDownMenu)
    }
  }, [])

  return (
    <div className={`${css.menuBar} ${classStyle}`}>
      <Button
        ref={refBtn}
        className={css.dropdownMenu}
        onClick={() => {
          setOpenMenu(open => !open)
        }}
        children={icon}
        aria-haspopup="true"
        aria-label="Abrir Menú"
      />
      <ul
        ref={refDownMenu}
        className={`${css.menu} ${
          direction.x === 'left' ? css.leftOpenMenu : css.rightOpenMenu
        } ${direction.y === 'bottom' ? css.bottomOpenMenu : css.topOpenMenu} ${
          openMenu ? css.openMenu : ''
        }`}
        aria-expanded={openMenu}>
        {listOption.map((option, key) => (
          <li key={key}>
            <Button
              onClick={option.action}
              className={css.menuButton}
              children={option.name}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
