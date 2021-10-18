import { TrackedLink } from './Types'

const linksStorageKey = 'links'

export async function getLinksAsync() {
  return new Promise<TrackedLink[]>((resolve) => {
    chrome.storage.sync.get([linksStorageKey], (data) =>
      resolve(JSON.parse(data.links)),
    )
  })
}

export async function setLinksAsync(links: TrackedLink[]) {
  await new Promise(() => {
    chrome.storage.sync.set({ links: JSON.stringify(links) })
  })
}

export async function getCurrentTabAsync() {
  return await new Promise<chrome.tabs.Tab>(function (resolve) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      resolve(tabs[0])
    })
  })
}

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.active) {
    const links = (await getLinksAsync()) as TrackedLink[]
    if (links.some((link) => tab.url?.startsWith(link.baseURL))) {
      const savedLink = links.find((link) => tab.url?.includes(link.baseURL))
      if (savedLink) {
        savedLink.LastVisitURL = tab.url
        await setLinksAsync(links)
      }
    }
  }
})
