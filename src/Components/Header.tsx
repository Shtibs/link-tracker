import React, { useState, useEffect } from 'react'
import { TrackedLink } from '../Types'
import { getCurrentTabAsync } from '../background'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../views/Popup/Style.css'

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

  const addButton = isLinkExists ? (
    <button
      className="btn btn-success btn-circle mx-2"
      title="This page is already saved."
      disabled
    >
      <i className="bi bi-check-lg"></i>
    </button>
  ) : (
    <button
      className="btn btn-secondary btn-circle mx-2"
      onClick={addLink}
      title="Add current page to the link list."
    >
      <i className="bi bi-plus-lg"></i>
    </button>
  )
  return (
    <header className="d-flex justify-content-center mt-3 mx-3 card-header">
      <h1 data-localize="appName">Link Tracker</h1>
      {addButton}
    </header>
  )
}

export default Header
