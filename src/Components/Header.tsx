import * as React from "react";
import { TrackedLink } from "../Types";
import "../views/Popup/App.css";

const Header = (props: { addLink: (newLink: TrackedLink) => void }) => {
  const addLink = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const newLink: TrackedLink = {
        title: tabs[0].title ?? "",
        baseURL: tabs[0].url ?? "",
        LastVisitURL: tabs[0].url,
        faviconSrc: tabs[0].favIconUrl,
      };
      props.addLink(newLink);
    });
  };
  return (
    <header className="header">
      <h1 data-localize="appName">Link Tracker</h1>
      <button onClick={addLink} className="save-button" id="savepage">
        +
      </button>
    </header>
  );
};

export default Header;
