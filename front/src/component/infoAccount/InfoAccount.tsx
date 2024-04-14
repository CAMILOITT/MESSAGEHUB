import type React from 'react'
import { useRef } from 'react'
import { URL_API } from '../../const/env'
import type { MessageInfoApp } from '../../type/messagesApp/interface'
import Avatar from '../../ui/avatar/Avatar'
import InfoAccountEdit from '../infoAccountEdit/InfoAccountEdit'
import css from './InfoAccount.module.css'

interface InfoAccountProps {
  name: string
  description?: string
  imgAvatar?: string
  edit: boolean
  setListMessageInfo?: React.Dispatch<React.SetStateAction<MessageInfoApp[]>>
}
export default function InfoAccount({
  name,
  description,
  edit,
  imgAvatar,
  setListMessageInfo,
}: InfoAccountProps) {
  const refFile = useRef<HTMLInputElement | null>(null)
  const refAvatarImg = useRef<HTMLImageElement | null>(null)

  function uploadImg() {
    if (!edit) return
    refFile.current?.click()
  }

  function updateAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target
    if (!files) return
    const file = files[0]

    const formData = new FormData()

    formData.append('imgAvatar', file)

    formData.append('_id', localStorage.getItem('id') || '')

    const config: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: localStorage.getItem('Auth') || '',
      },
      body: formData,
    }
    fetch(`${URL_API}/setAvatar`, config)
      .then(res => {
        if (!res.ok) throw new Error('no se pudo actualizar la imagen')
        return res.blob()
      })
      .then(blob => {
        const img = URL.createObjectURL(blob)
        if (!refAvatarImg.current) return
        refAvatarImg.current.src = img
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
  }

  return (
    <div className={css.informationAccount}>
      <div
        className={`${css.img} ${edit ? css.imgEdit : ''}`}
        onClick={uploadImg}>
        <Avatar
          nick={name}
          imgAvatar={`${imgAvatar}`}
          ref={refAvatarImg}
          className={css.imgAvatar}
        />
        <input
          type="file"
          name=""
          id=""
          ref={refFile}
          className={css.uploadImg}
          onChange={updateAvatar}
          accept=".jpg, .jpeg, .png"
        />
      </div>
      <InfoAccountEdit
        title="Nombre"
        description={name}
        urlFetch="/setNick"
        canEdit={edit}
        setListMessageInfo={setListMessageInfo}
      />
      <InfoAccountEdit
        title="Description"
        description={description}
        urlFetch="/setDescription"
        canEdit={edit}
        setListMessageInfo={setListMessageInfo}
      />
    </div>
  )
}
