import * as React from "react";

export default function ExpandingTextarea() {
  const [text, setText] = React.useState("");
  const textAreaRef = React.useRef(null);

  const handleChange = (event) => {
    setText(event.target.value);
    textAreaRef.current.style.height = "inherit";
    //set do this to reset the text area height to it's default before doing calculations.
    const scrollHeight = textAreaRef.current.scrollHeight;
    //we can do this because now we're directly querying the dom element
    textAreaRef.current.style.height = scrollHeight + "px";
    //we get the scroll height from the ref and then update the text area height to be equal to it.
  };

  return (
    <section className="container">
      <h1>Expanding Textarea</h1>
      <label htmlFor="textarea">Enter or paste in some text</label>
      <textarea
        id="textarea"
        placeholder="Enter some text"
        ref={textAreaRef}
        value={text}
        onChange={handleChange}
        rows={1}
      />
    </section>
  );
}
