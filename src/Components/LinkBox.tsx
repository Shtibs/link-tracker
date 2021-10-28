import * as React from 'react'
import { TrackedLink } from '../Types'
import Link from './Link'
import '../views/Popup/Style.scss'

const LinkBox = (props: {
  linkList: TrackedLink[]
  updateLink: (newLink: TrackedLink, oldTitle: string) => void
  deleteLink: (linkTitle: string) => void
}) => {
  React.useEffect(() => {})
  return (
    <div className="card-body">
      {props.linkList.map((currentLink: TrackedLink, index) => (
        <Link
          id={index}
          link={currentLink}
          updateLink={props.updateLink}
          deleteLink={props.deleteLink}
        />
      ))}
    </div>
  )
}

export default LinkBox
