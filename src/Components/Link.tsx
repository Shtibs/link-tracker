import { link } from "fs";
import React, { useState } from "react";
import { TrackedLink } from "../Types";
import "../views/Popup/App.css";

const defaultLink: TrackedLink = {
  title: "",
  baseURL: "",
};

const Link = (props: {
  link: TrackedLink;
  updateLink: (newLink: TrackedLink, oldTitle: string) => void;
  deleteLink: (linkTitle: string) => void;
}) => {
  const [newLink, setNewLink] = useState<TrackedLink>(defaultLink);
  const [editMode, setEditMode] = useState<boolean>(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    property: string
  ) => {
    setNewLink({ ...newLink, [property]: e.target.value });
  };
  const goToURL = () => {
    window.open(props.link.LastVisitURL);
  };
  const deleteLink = () => {
    props.deleteLink(props.link.title);
  };
  const enableEdit = () => {
    setNewLink(props.link);
    setEditMode(true);
  };
  const discardEdit = () => {
    setEditMode(false);
  };
  const saveChanges = () => {
    props.updateLink(newLink, props.link.title);
    setEditMode(false);
  };
  return (
    <div
      title={
        "Current: " + props.link.LastVisitURL?.substr(props.link.baseURL.length)
      }
    >
      <div className="reading-item read">
        <a
          className="delete-button"
          title="Delete link"
          onClick={editMode ? discardEdit : deleteLink}
        >
          ×
        </a>
        {editMode ? (
          <a className="store-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="edit-img replaced-svg"
              onClick={saveChanges}
            >
              <path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"></path>
            </svg>
          </a>
        ) : (
          <a className="edit-button" onClick={enableEdit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="edit-img replaced-svg"
            >
              <path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path>
            </svg>
          </a>
        )}

        <a className={editMode ? "item-link edit" : "item-link"}>
          {editMode ? (
            <input
              type="text"
              className="edit-title"
              hidden={!editMode}
              name="title"
              placeholder="Title:"
              value={newLink.title}
              onChange={(e) => handleChange(e, "title")}
            />
          ) : (
            <span className="title" onClick={goToURL}>
              {props.link.title}
            </span>
          )}
          {editMode ? (
            <input
              type="text"
              className="edit-title"
              hidden={!editMode}
              name="linkURL"
              placeholder="Base URL:"
              value={newLink.baseURL}
              onChange={(e) => handleChange(e, "linkURL")}
            />
          ) : (
            <span className="host" hidden={editMode} onClick={goToURL}>
              {props.link.baseURL}
            </span>
          )}

          <div className="favicon">
            <img className="favicon-img" src={props.link.faviconSrc} />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Link;
