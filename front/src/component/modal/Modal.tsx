import { forwardRef, useImperativeHandle, useRef } from 'react'
import CloseIcon from '../../assets/icons/CloseIcon'
import css from './Modal.module.css'

interface InfoAccountProps {
  children: React.ReactNode
  classStyle?: string
  positionBtn?: { x: number; y: number }
}

export interface MethodModal {
  closeModal: () => void
  openModal: () => void
}

const Modal = forwardRef<MethodModal, InfoAccountProps>(
  ({ children, classStyle = '' }, ref) => {
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
      <dialog ref={refDialog} className={`${css.modal} ${classStyle}`}>
        <button onClick={closeModal} className={css.btnClose}>
          <CloseIcon />
        </button>
        {children}
      </dialog>
    )
  }
)

export default Modal
