import { TrackedLink } from "./Types";

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete" && tab.active) {
    let links: TrackedLink[];
    chrome.storage.sync.get(["links"], function (data) {
      links = JSON.parse(data.links);
      if (links.some((link) => tab.url?.includes(link.baseURL))) {
        (
          links.find((link) => tab.url?.includes(link.baseURL)) as TrackedLink
        ).LastVisitURL = tab.url;
        chrome.storage.sync.set({ links: JSON.stringify(links) });
      }
    });
  }
});
