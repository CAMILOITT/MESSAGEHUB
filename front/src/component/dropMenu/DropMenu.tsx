import { forwardRef, useImperativeHandle, useRef } from 'react'
interface DropMenuProps {
  listMethod: {
    method: () => void
    name: string
  }[]
  // direction: { x: 'left' | 'right'; y: 'top' | 'bottom' }
  // icon: JSX.Element
}
interface ComponentRef {}

const DropMenu = forwardRef<ComponentRef, DropMenuProps>(
  ({ listMethod }, ref) => {
    const refMenu = useRef<HTMLUListElement | null>(null)

    useImperativeHandle(
      ref,
      () => {
        return {}
      },
      []
    )

    return (
      <ul ref={refMenu}>
        {listMethod.map(({ method, name }, key) => (
          <li key={key}>
            <button onClick={method}>{name}</button>
          </li>
        ))}
      </ul>
    )
  }
)
export default DropMenu
