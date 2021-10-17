import { TrackedLink } from './Types'

const linksStorageKey = 'links'

export function getLinks() {
  return new Promise<TrackedLink[]>(function (resolve) {
    chrome.storage.sync.get([linksStorageKey], function (data) {
      const links: TrackedLink[] = JSON.parse(data.links)
      resolve(links)
    })
  })
}

export async function setLinksAsync(links: TrackedLink[]) {
  await new Promise(function () {
    chrome.storage.sync.set({ links: JSON.stringify(links) })
  })
}

export async function isLinkExistsAsync(url: string) {
  const links = await getLinks()
  return links.some((l) => url.startsWith(l.baseURL))
}

export function getCurrentTab() {
  return new Promise<chrome.tabs.Tab>(function (resolve) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      resolve(tabs[0])
    })
  })
}
