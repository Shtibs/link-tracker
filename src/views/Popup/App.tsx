import React, { useState, useEffect } from "react";
import { TrackedLink } from "../../Types";
import Header from "../../Components/Header";
import LinkBox from "../../Components/LinkBox";

const jojo: TrackedLink = {
  title: "Jojo",
  baseURL:
    "http://mangastream.mobi/jojos-bizarre-adventure-part-6-stone-ocean-",
  LastVisitURL:
    "http://mangastream.mobi/jojos-bizarre-adventure-part-6-stone-ocean-chapter-10#22",
  faviconSrc: "http://mangastream.mobi/frontend/images/favico12.png",
};
const defalutLinks: TrackedLink[] = [jojo];

function App() {
  const [links, setLinks] = React.useState<TrackedLink[]>(defalutLinks);
  useEffect(() => {
    chrome.storage.sync.get(["links"], (data) => {
      const newLinks: TrackedLink[] = JSON.parse(data.links);
      setLinks([...newLinks]);
    });
  }, []);
  useEffect(() => {
    const stringLinks = JSON.stringify(links);
    chrome.storage.sync.set({ links: stringLinks });
  }, [links]);

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete" && tab.active) {
      console.log(tab.url);
    }
  });

  const addLink = (newLink: TrackedLink) => {
    setLinks([...links, newLink]);
  };
  const deleteLink = (linkTitle: string) => {
    setLinks([...links.filter((link) => link.title !== linkTitle)]);
  };
  const updateLink = (newLink: TrackedLink, oldTitle: string) => {
    const index = links.indexOf(
      links.find((link) => link.title === oldTitle) as TrackedLink
    );
    let tempLinks = [...links];
    tempLinks[index].title = newLink.title;
    tempLinks[index].baseURL = newLink.baseURL;
    setLinks([...tempLinks]);
  };
  return (
    <React.Fragment>
      <Header addLink={addLink} />
      <LinkBox
        linkList={links}
        updateLink={updateLink}
        deleteLink={deleteLink}
      />
    </React.Fragment>
  );
}

export default App;
