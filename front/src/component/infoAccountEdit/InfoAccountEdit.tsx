import {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import CheckIcon from '../../assets/icons/CheckIcon'
import EditIcon from '../../assets/icons/EditIcon'
import { URL_API } from '../../const/env'
import css from './InfoAccountEdit.module.css'
import { UserContext } from '../../context/user/User'
import { MessageInfoApp } from '../../type/messagesApp/interface'

interface InfoAccountEditProps {
  title: string
  description?: string
  edit: boolean
  urlFetch?: string
  setListMessageInfo?: React.Dispatch<React.SetStateAction<MessageInfoApp[]>>
}
export interface InfoAccountEditRef {
  value: string
}

const InfoAccountEdit = forwardRef<InfoAccountEditRef, InfoAccountEditProps>(
  ({ title, description, urlFetch, edit, setListMessageInfo }, ref) => {
    const refInFo = useRef<HTMLParagraphElement | null>(null)
    const [visibilityBtn, setVisibilityBtn] = useState<'edit' | 'view'>('edit')
    const [valueDescription, setValueDescription] = useState('')

    const { infoUser } = useContext(UserContext)

    useImperativeHandle(
      ref,
      () => {
        return {
          value: valueDescription,
        }
      },
      [valueDescription]
    )

    function editDescription() {
      refInFo.current?.setAttribute('contenteditable', 'true')
      setVisibilityBtn('view')
    }

    function getValue() {
      refInFo.current?.removeAttribute('contenteditable')
      setVisibilityBtn('edit')
      setValueDescription(`${refInFo.current?.textContent}`)

      fetch(`${URL_API}${urlFetch}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('Auth')}`,
        },
        body: JSON.stringify({
          _id: infoUser._id,
          description: refInFo.current?.textContent,
        }),
      })
        .then(res => {
          if (!res.ok) throw new Error('no se pudo actualizar')
          return res.json()
        })
        .catch((error: Error) => {
          setListMessageInfo &&
            setListMessageInfo(prev => [
              ...prev,
              {
                message: `${error.message}`,
                id: crypto.randomUUID(),
                status: 'error',
              },
            ])
        })
    }

    function handleKeyEnter(e: React.KeyboardEvent) {
      if (e.key === 'Enter') {
        getValue()
      }
    }

    return (
      <div className={css.infoAccount}>
        <div className={css.infoTitle}>
          <h3>{title}</h3>
          {edit && (
            <div className={css.buttonsEditable}>
              <button
                onClick={editDescription}
                className={`${css.btnEdit} ${
                  visibilityBtn === 'edit' ? css.btnVisible : css.btnHidden
                }`}
              >
                <EditIcon />
              </button>
              <button
                onClick={getValue}
                className={`${css.btnEdit} ${
                  visibilityBtn === 'view' ? css.btnVisible : css.btnHidden
                }`}
              >
                <CheckIcon />
              </button>
            </div>
          )}
        </div>
        <p
          ref={refInFo}
          className={`${css.info} ${
            visibilityBtn === 'edit' ? css.infoEdit : ''
          }`}
          onKeyDown={handleKeyEnter}
        >
          {description}
        </p>
      </div>
    )
  }
)
export default InfoAccountEdit
