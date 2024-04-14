import { useContext, useRef, useState } from 'react'
import CheckIcon from '../../assets/icons/CheckIcon'
import EditIcon from '../../assets/icons/EditIcon'
import { URL_API } from '../../const/env'
import { UserContext } from '../../context/user/User'
import type { MessageInfoApp } from '../../type/messagesApp/interface'
import Button from '../../ui/button/Button'
import css from './InfoAccountEdit.module.css'

interface InfoAccountEditProps {
  title: string
  description?: string
  canEdit: boolean
  urlFetch?: string
  setListMessageInfo?: React.Dispatch<React.SetStateAction<MessageInfoApp[]>>
}

export default function InfoAccountEdit({
  title,
  description,
  urlFetch,
  canEdit,
  setListMessageInfo,
}: InfoAccountEditProps) {
  const refInFo = useRef<HTMLParagraphElement | null>(null)
  const [edit, setEdit] = useState(false)
  const { infoUser } = useContext(UserContext)

  function editDescription() {
    setEdit(true)
    // if (!refInFo?.current) return
    // refInFo.current.focus()
    // refInFo.current.onfocus = () => {
    //   refInFo.current?.focus()
    // }
  }
  //  c
  function getValue() {
    const pEdit = refInFo?.current
    if (!pEdit) return
    fetch(`${URL_API}${urlFetch}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('Auth')}`,
      },
      body: JSON.stringify({
        _id: infoUser._id,
        description: pEdit.textContent?.trim(),
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('no se pudo actualizar')
        return res.json()
      })
      .catch((error: Error) => {
        setListMessageInfo?.(prev => [
            ...prev,
            {
              message: `${error.message}`,
              id: crypto.randomUUID(),
              status: 'error',
            },
          ])
      })
      .finally(() => {
        setEdit(false)
      })
  }

  function handleKeyEnter(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      setEdit(false)
      getValue()
    }
  }

  return (
    <div className={css.infoAccount}>
      <div className={css.infoTitle}>
        <h3>{title}</h3>
        {canEdit && (
          <div className={css.buttonsEditable}>
            {!edit ? (
              <Button
                onClick={editDescription}
                className={`${css.btnEdit}`}
                children={<EditIcon />}
                aria-label={`editar ${title}`}
              />
            ) : (
              <Button
                onClick={getValue}
                children={<CheckIcon />}
                className={`${css.btnEdit}`}
                aria-label={`ver ${title}`}
              />
            )}
          </div>
        )}
      </div>
      <p
        role="paragraph"
        ref={refInFo}
        className={`${css.info} ${edit ? css.infoEdit : ''}`}
        onKeyDown={handleKeyEnter}
        contentEditable={edit}>
        {description}
      </p>
    </div>
  )
}
