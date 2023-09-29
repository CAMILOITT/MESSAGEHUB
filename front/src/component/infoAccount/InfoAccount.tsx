import { useRef } from 'react'
import ImgUser from '../../assets/icons/ImgUser'
import { URL_API } from '../../const/env'
import { MessageInfoApp } from '../../type/messagesApp/interface'
import InfoAccountEdit, {
  InfoAccountEditRef,
} from '../infoAccountEdit/InfoAccountEdit'
import css from './InfoAccount.module.css'
interface InfoAccountProps {
  name: string
  description?: string
  img_avatar?: string
  edit: boolean
  setListMessageInfo?: React.Dispatch<React.SetStateAction<MessageInfoApp[]>>
}

export default function InfoAccount({
  name,
  description,
  edit,
  img_avatar,
  setListMessageInfo,
}: InfoAccountProps) {
  const refFile = useRef<HTMLInputElement | null>(null)
  const refName = useRef<InfoAccountEditRef | null>(null)
  const refDescription = useRef<InfoAccountEditRef | null>(null)
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

  return (
    <div className={css.informationAccount}>
      <div
        className={`${css.img} ${edit ? css.imgEdit : ''}`}
        onClick={uploadImg}
      >
        {!img_avatar ? (
          <ImgUser nick={`${name}`} />
        ) : (
          <img
            src={`${URL_API}/${img_avatar}`}
            alt="user image"
            className={css.imgAvatar}
            ref={refAvatarImg}
          />
        )}
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
        ref={refName}
        title="Nombre"
        description={name}
        urlFetch="/setNick"
        edit={edit}
        setListMessageInfo={setListMessageInfo}
      />
      <InfoAccountEdit
        ref={refDescription}
        title="Description"
        description={description}
        urlFetch="/setDescription"
        edit={edit}
        setListMessageInfo={setListMessageInfo}
      />
    </div>
  )
}
