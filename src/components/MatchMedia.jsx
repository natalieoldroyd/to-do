import * as React from "react";
import { phone, desktop } from "./icons";

const query = "only screen and (max-width : 768px)";

const snapshot = () => {
   return window.matchMedia(query).matches
   //returns true if it's a match on mobile screen
   //The matches read-only property of the MediaQueryList interface is a
   //boolean value that returns true if the document currently matches the media
   //query list, or false if not.
}

const subscribe = (callback) => {
    const matchMedia = window.matchMedia(query);
    //any screensize
    matchMedia.addEventListener("change", callback)
    //callback comes from the matchMedia api

    return () => {
        matchMedia.removeEventListener("change", callback)
    }
}

export default function MatchMedia() {
    const isMobile = React.useSyncExternalStore(subscribe, snapshot)
    //this boolean value is determined by snapshot which returns true if mobile

  return (
    <section>
      Resize your browser's window to see changes.
      <article>
        <figure className={isMobile ? "active" : ""}>
          {phone}
          <figcaption>Is mobile: {`${isMobile}`}</figcaption>
        </figure>

        <figure className={!isMobile ? "active" : ""}>
          {desktop}
          <figcaption>Is larger device: {`${!isMobile}`}</figcaption>
        </figure>
      </article>
    </section>
  );
}
