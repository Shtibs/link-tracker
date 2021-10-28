import React, { useState, useEffect } from 'react'
import { TrackedLink } from '../Types'
import { getCurrentTabAsync } from '../background'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '../views/Popup/Style.scss'

const Header = (props: {
  links: TrackedLink[]
  addLink: (newLink: TrackedLink) => void
}) => {
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab>()
  const [isLinkExists, setIsLinkExists] = useState<boolean>(false)

  useEffect(() => {
    initializeCurretTab()
  }, [])

  useEffect(() => {
    if (currentTab) {
      setIsLinkExists(
        props.links.some((l) => currentTab.url?.startsWith(l.baseURL)),
      )
    }
  }, [props.links, currentTab])

  const initializeCurretTab = async () => {
    const tab = await getCurrentTabAsync()
    setCurrentTab(tab)
  }

  const addLink = () => {
    const newLink: TrackedLink = {
      title: currentTab?.title ?? '',
      baseURL: currentTab?.url ?? '',
      LastVisitURL: currentTab?.url,
      faviconSrc: currentTab?.favIconUrl,
    }
    props.addLink(newLink)
  }

  const tooltip = isLinkExists
    ? 'This page is already saved.'
    : 'Add current page to the link list.'

  const styleClasses = `btn-circle ${isLinkExists ? 'success' : 'secondary'}`

  return (
    <header className="ext-header">
      <div className="header-content">
        <h1 data-localize="appName">Link Tracker</h1>
        <button className={styleClasses} onClick={addLink} title={tooltip}>
          <i></i>
        </button>
      </div>
    </header>
  )
}

export default Header
