import React, { useState, useEffect } from 'react'
import { TrackedLink } from '../../Types'
import Header from '../../Components/Header'
import LinkBox from '../../Components/LinkBox'
// import { HighlightSpanKind } from 'typescript'

function App() {
  const [links, setLinks] = useState<TrackedLink[]>([])
  useEffect(() => {
    chrome.storage.sync.get(['links'], (data) => {
      const newLinks: TrackedLink[] = JSON.parse(data.links)
      setLinks([...newLinks])
    })
  }, [])
  useEffect(() => {
    const stringLinks = JSON.stringify(links)
    chrome.storage.sync.set({ links: stringLinks })
  }, [links])

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.active) {
      console.log('UPDATED', tab.url)
    }
  })

  const addLink = (newLink: TrackedLink) => {
    const existingLink = links.find((l) =>
      newLink.baseURL.startsWith(l.baseURL),
    )
    if (existingLink !== undefined) {
      existingLink.LastVisitURL = newLink.baseURL
      updateLink(existingLink, existingLink.title)
      return
    }

    setLinks([...links, newLink])
  }
  const deleteLink = (linkTitle: string) => {
    setLinks([...links.filter((link) => link.title !== linkTitle)])
  }
  const updateLink = (link: TrackedLink, linkTitle: string) => {
    const index = links.indexOf(
      links.find((link) => link.title === linkTitle) as TrackedLink,
    )
    let tempLinks = [...links]
    tempLinks[index].title = link.title
    tempLinks[index].baseURL = link.baseURL
    setLinks([...tempLinks])
  }
  return (
    <React.Fragment>
      <Header addLink={addLink} />
      <LinkBox
        linkList={links}
        updateLink={updateLink}
        deleteLink={deleteLink}
      />
    </React.Fragment>
  )
}

export default App
