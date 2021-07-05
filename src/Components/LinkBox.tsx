import * as React from "react";
import { TrackedLink } from "../Types";
import Link from "./Link";
import "../views/Popup/App.css";

const LinkBox = (props: {
  linkList: TrackedLink[];
  updateLink: (newLink: TrackedLink, oldTitle: string) => void;
  deleteLink: (linkTitle: string) => void;
}) => {
  React.useEffect(() => {});
  return (
    <div>
      {props.linkList.map((currentLink: TrackedLink) => (
        <Link
          link={currentLink}
          updateLink={props.updateLink}
          deleteLink={props.deleteLink}
        />
      ))}
    </div>
  );
};

export default LinkBox;
