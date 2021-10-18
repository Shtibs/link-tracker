import React, { useState, useEffect } from 'react'
import { TrackedLink } from '../../Types'
import Header from '../../Components/Header'
import LinkBox from '../../Components/LinkBox'
import { getLinksAsync, setLinksAsync } from '../../background'

function App() {
  const [links, setLinks] = useState<TrackedLink[]>([])
  useEffect(() => {
    initializeLinks()
  }, [])

  useEffect(() => {
    setLinksAsync(links)
  }, [links])

  const initializeLinks = async () => {
    const newLinks = await getLinksAsync()
    setLinks([...newLinks])
  }

  const addLink = (newLink: TrackedLink) => {
    const existingLink = links.find((l) =>
      newLink.baseURL.startsWith(l.baseURL),
    )
    if (existingLink) {
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
      <Header links={links} addLink={addLink} />
      <LinkBox
        linkList={links}
        updateLink={updateLink}
        deleteLink={deleteLink}
      />
    </React.Fragment>
  )
}

export default App
