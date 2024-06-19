import * as React from "react";
import {useState, useContext, useRef, useEffect} from "react";

const videoPlaybackContext = React.createContext({
  playingVideoId: null,
  setPlayingVideoId: () => {}
});

function VideoPlaybackProvider({ children }) {
  // const playingVideoId = null;
  // const setPlayingVideoId = () => {};

  const [playingVideoId, setPlayingVideoId] = useState(null)

  return <videoPlaybackContext.Provider value={{playingVideoId, setPlayingVideoId}} >{children}</videoPlaybackContext.Provider>;
}

function VideoItem({ videoId, title, poster, src }) {
  //takes props not context. If nothing was here that suggests this will all come from context.

  const { playingVideoId, setPlayingVideoId} = useContext(videoPlaybackContext)

  const videoRef = useRef(null)
  const videoIsActive = playingVideoId === videoId;

  const handleTogglePlay = () => {
    //this acts on a single videoItem. If we didn't rely on the useEffect this would just set play or pause on a single video.
    //so we don't want to use our ref here to play() etc

    if (!videoIsActive) {
      //if we're not already playing it (videoIsActive is false then we can update playingVideoId tobe the new videoId)
      //we're making a selction
      setPlayingVideoId(videoId)
    } else {
      setPlayingVideoId(null)
    }
  };

  useEffect(() => {
    //each time state changes (playingVideoId) it will trigger a re-render but we're monitoring for changes to videoIsActive.
    //when videoIsActive changes we're asking each of the array of VideoItem components if their videoId is equal to the id we set in state
    //for playingVideoId.
    //If that videoItem is active then we allow it to play and otherwise pause it
    //the handler makes the selection
    //the useEffect controls each of the videos. Play the latest selection. Pause all others.
    if (videoIsActive) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }, [videoIsActive])

  return (
    <li>
      <h3>{title}</h3>
      <article>
        <video poster={poster} ref={videoRef}>
          <source src={src} type="video/mp4" />
        </video>
        <button
          title={videoIsActive ? "Pause" : "Play"}
          onClick={handleTogglePlay}
        >
          {videoIsActive ? "⏸" : "▶"}
        </button>
      </article>
    </li>
  );
}

function NewsFeed() {
  const videos = [
    {
      id: 1,
      title: "The React Way",
      poster: "https://react.gg/img/visualized-og2.jpg",
      src:
        "https://stream.mux.com/TbVCJiOghmISJgg4AznPfFHYRfiVoek8OJHF56Y01oR4/high.mp4"
    },
    {
      id: 2,
      title: "The History of the Web",
      poster: "https://react.gg/img/visualized-og1.jpg",
      src:
        "https://stream.mux.com/EwJPlEBa0046jGSVdYOnRsX9WnqHjytgIBXwkOt7LvVg/high.mp4"
    },
    {
      id: 3,
      title: "Rendering, Visualized",
      poster: "https://react.gg/img/visualized-og5.jpg",
      src:
        "https://stream.mux.com/VvQKMwPEOq5BUnc9eRN4sL5sUEZrHqWxNlCbpXSkE3I/high.mp4"
    }
  ];

  return (
    <div>
      <h1>News Feed</h1>
      <ul>
       {videos.map(video => (
        <VideoItem
          videoId={video.id}
          title={video.title}
          poster={video.poster}
          src={video.src}
          />
       ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <VideoPlaybackProvider>
      <NewsFeed />
    </VideoPlaybackProvider>
  );
}
