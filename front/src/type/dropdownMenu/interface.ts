export interface DropDownMenuProps {
  name: string
  event: () => void
  group?: DropDownMenuProps
}
