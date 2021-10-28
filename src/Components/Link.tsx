import React, { useState } from 'react'
import { TrackedLink } from '../Types'
import { useSpring, animated } from 'react-spring'
import '../views/Popup/Style.scss'
import '@fortawesome/fontawesome-free/css/all.css'

const defaultLink: TrackedLink = {
  title: '',
  baseURL: '',
}

const Link = (props: {
  link: TrackedLink
  id: number
  updateLink: (newLink: TrackedLink, title: string) => void
  deleteLink: (linkTitle: string) => void
}) => {
  const [newLink, setNewLink] = useState<TrackedLink>(defaultLink)
  const [editMode, setEditMode] = useState<boolean>(false)
  const fadeIn = useSpring({
    to: { transform: 'translatex(0%)' },
    from: { transform: 'translatex(100%)' },
    leave: { transform: 'translatex(100%)' },   
    delay: props.id * 50,
  })
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    property: string,
  ) => {
    setNewLink({ ...newLink, [property]: e.target.value })
  }
  const goToURL = () => {
    window.open(props.link.LastVisitURL)
  }
  const deleteLink = () => {
    props.deleteLink(props.link.title)
  }
  const enableEdit = () => {
    setNewLink(props.link)
    setEditMode(true)
  }
  const discardEdit = () => {
    setEditMode(false)
  }
  const saveChanges = () => {
    props.updateLink(newLink, props.link.title)
    setEditMode(false)
  }

  const favicon = (
    <img
      className="w-100"
      src={props.link.faviconSrc ?? 'logo192.png'}
      alt="Site favicon"
    />
  )

  return (
    <animated.div
      style={fadeIn}
      className="link-item"
      title={
        'Current: ' + props.link.LastVisitURL?.substr(props.link.baseURL.length)
      }
    >
      {editMode ? (
        <div className="row">
          <div className="link-image">{favicon}</div>

          <div className="link-content">
            <div className="row">
              <input
                type="text"
                hidden={!editMode}
                name="title"
                placeholder="Title:"
                value={newLink.title}
                className="form-control"
                onChange={(e) => handleChange(e, 'title')}
              />
            </div>
            <div className="row">
              <input
                type="text"
                hidden={!editMode}
                name="baseURL"
                placeholder="Base URL:"
                className="form-control"
                value={newLink.baseURL}
                onChange={(e) => handleChange(e, 'baseURL')}
              />
            </div>
          </div>
          <div className="link-buttons">
            <div className="row">
              <button
                title="Discard changes"
                className="icon btn px-0"
                onClick={discardEdit}
              >
                <i className="far fa-times-circle"></i>
              </button>
            </div>
            <div className="row">
              <button
                title="Save changes"
                className="icon btn px-0"
                onClick={saveChanges}
              >
                <i className="fa fa-save"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="link-image" onClick={goToURL}>
            {favicon}
          </div>

          <div className="link-content" onClick={goToURL}>
            <div className="row">
              <strong className="card-title text-truncate">
                {props.link.title}
              </strong>
            </div>
            <div className="row">
              <span className="card-text text-truncate">
                {props.link.baseURL}
              </span>
            </div>
          </div>

          <div className="link-buttons">
            <div className="row">
              <button
                title="Remove link"
                className="icon btn px-0"
                onClick={deleteLink}
              >
                <i className="far fa-times-circle"></i>
              </button>
            </div>
            <div className="row">
              <button
                title="Edit link"
                className="icon btn px-0"
                onClick={enableEdit}
              >
                <i className="fa fa-edit"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </animated.div>
  )
}

export default Link
