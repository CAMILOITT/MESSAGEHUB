import { forwardRef, useImperativeHandle, useRef } from 'react'
import CloseIcon from '../../assets/icons/CloseIcon'
import css from './Modal.module.css'
import Button from '../../ui/button/Button'

interface InfoAccountProps extends React.HTMLAttributes<HTMLDialogElement> {
  children: React.ReactNode
  positionBtn?: { x: number; y: number }
}

export interface MethodModal {
  closeModal: () => void
  openModal: () => void
}

const Modal = forwardRef<MethodModal, InfoAccountProps>(
  ({ children, ...props }, ref) => {
    const refDialog = useRef<HTMLDialogElement | null>(null)

    function closeModal() {
      refDialog.current?.close()
    }

    function openModal() {
      refDialog.current?.showModal()
    }

    useImperativeHandle(ref, () => {
      return {
        closeModal,
        openModal,
      }
    })

    return (
      <dialog ref={refDialog} className={`${css.modal} ${props.className}`}>
        <Button
          onClick={closeModal}
          className={css.btnClose}
          children={<CloseIcon />}
          aria-label="Cerrar Modal"
        />
        {children}
      </dialog>
    )
  },
)

export default Modal
