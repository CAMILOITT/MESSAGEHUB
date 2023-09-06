import { useEffect, useRef, useState } from 'react'
import css from './DropDownMenu.module.css'

interface DropDownMenuProps {
  listOption: { function: () => void; name: string }[]
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
    refDownMenu.current?.contains(target)
    refBtn.current?.contains(target)

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
  })

  return (
    <div className={`${css.menuBar} ${classStyle}`}>
      <button
        ref={refBtn}
        className={css.dropdownMenu}
        onClick={() => {
          setOpenMenu(true)
        }}
      >
        {icon}
      </button>
      <ul
        ref={refDownMenu}
        className={`${css.menu} ${openMenu && css.openMenu} ${
          direction.x === 'left' ? css.leftOpenMenu : css.rightOpenMenu
        } ${direction.y === 'bottom' ? css.bottomOpenMenu : css.topOpenMenu}`}
      >
        {listOption.map((option, key) => (
          <li key={key}>
            <button onClick={option.function} className={css.menuButton}>
              {option.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
