import * as React from 'react'
import { TrackedLink } from '../Types'
import { getCurrentTab, isLinkExistsAsync } from '../ChromeApi'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../views/Popup/Style.css'

const Header = (props: { addLink: (newLink: TrackedLink) => void }) => {
  const [currentTab, setCurrentTab] = React.useState<chrome.tabs.Tab>()
  const [isLinkExists, setIsExists] = React.useState<boolean>(false)

  React.useEffect(() => {
    async function setData() {
      const tab = await getCurrentTab()
      setCurrentTab(tab)
      if (tab !== undefined && tab.url !== undefined) {
        const isExists = await isLinkExistsAsync(tab.url)
        console.log('is the link exists?', isExists)
        await setIsExists(isExists)
      }
    }

    setData()
  }, [])

  const addLink = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const newLink: TrackedLink = {
        title: tabs[0].title ?? '',
        baseURL: tabs[0].url ?? '',
        LastVisitURL: tabs[0].url,
        faviconSrc: tabs[0].favIconUrl,
      }
      props.addLink(newLink)
    })
  }
  return (
    <header className="d-flex justify-content-center mt-3 mx-3 card-header">
      <h1 data-localize="appName">Link Tracker</h1>
      {isLinkExists ? (
        <button
          className="btn btn-secondary btn-circle mx-2"
          title="This page is already saved."
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
      )}
    </header>
  )
}

export default Header
