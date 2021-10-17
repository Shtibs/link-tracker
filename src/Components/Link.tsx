import React, { useState } from 'react'
import { TrackedLink } from '../Types'

const defaultLink: TrackedLink = {
  title: '',
  baseURL: '',
}

const Link = (props: {
  link: TrackedLink
  updateLink: (newLink: TrackedLink, oldTitle: string) => void
  deleteLink: (linkTitle: string) => void
}) => {
  const [newLink, setNewLink] = useState<TrackedLink>(defaultLink)
  const [editMode, setEditMode] = useState<boolean>(false)
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
    <div
      className="card container my-2 pointer"
      title={
        'Current: ' + props.link.LastVisitURL?.substr(props.link.baseURL.length)
      }
    >
      {editMode ? (
        <div className="row">
          <div className="align-self-center col-2 p-2">{favicon}</div>

          <div className="col-9 container">
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
          <div className="col-1 container align-self-center">
            <div className="row">
              <button
                title="Discard changes"
                className="btn px-0"
                onClick={discardEdit}
              >
                <i className="bi bi-x-circle"></i>
              </button>
            </div>
            <div className="row">
              <button
                title="Save changes"
                className="btn px-0"
                onClick={saveChanges}
              >
                <i className="bi bi-save"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="align-self-center col-2 p-2" onClick={goToURL}>
            {favicon}
          </div>

          <div className="col-9 container align-self-center" onClick={goToURL}>
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

          <div className="col-1 container align-self-center">
            <div className="row">
              <button
                title="Remove link"
                className="btn px-0"
                onClick={deleteLink}
              >
                <i className="bi bi-x-circle"></i>
              </button>
            </div>
            <div className="row">
              <button
                title="Edit link"
                className="btn px-0"
                onClick={enableEdit}
              >
                <i className="bi bi-pencil-square"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Link
