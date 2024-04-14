import { forwardRef, useImperativeHandle, useRef } from 'react'
import SearchIcon from '../../assets/icons/SearchIcon'
import css from './InputSearch.module.css'

interface InputSearchProps {
  Change?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface ComponentRef {}

const InputSearch = forwardRef<ComponentRef, InputSearchProps>(
  ({ Change }, ref) => {
    const Search = useRef<HTMLInputElement | null>(null)

    useImperativeHandle(
      ref,
      () => {
        return {}
      },
      [],
    )

    return (
      <>
        <label className={css.search}>
          <input
            type="search"
            className={css.inputSearch}
            placeholder="Search"
            onChange={Change}
            ref={Search}
          />
          <SearchIcon />
        </label>
      </>
    )
  },
)
export default InputSearch
