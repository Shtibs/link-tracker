import { TrackedLink } from './Types'
import { getLinks, setLinksAsync } from './ChromeApi'

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.active) {
    const links: TrackedLink[] = await getLinks()
    if (links.some((link) => tab.url?.startsWith(link.baseURL))) {
      const savedLink = links.find((link) =>
        tab.url?.includes(link.baseURL),
      ) as TrackedLink

      savedLink.LastVisitURL = tab.url
      await setLinksAsync(links)
    }
  }
})
