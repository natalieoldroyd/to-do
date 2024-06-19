import * as React from "react";
import {useRef, useEffect, useState} from "react";

// TASKS
// Add a new note when the user submits the form
// Scroll the new note into view
// Clear the input field when the user submits a valid note
// Prevent empty notes from being added

export default function FieldNotes() {
  const [notes, setNotes] = useState([
    "Components encapsulate both the visual representation of a particular piece of UI as well as the state and logic that goes along with it.",
    "The same intuition you have about creating and composing together functions can directly apply to creating and composing components. However, instead of composing functions together to get some value, you can compose components together to get some UI.",
    "JSX combines the power and expressiveness of JavaScript with the readability and accessibility of HTML",
    "Just like a component enabled the composition and reusability of UI, hooks enabled the composition and reusability of non-visual logic."
  ]);

  const newNoteRef = useRef(null);

  useEffect(() => {
    if (newNoteRef.current) {
      newNoteRef.current.scrollIntoView()
      //this is a method. We are NOT updating the value of the current property. We're invoking this function on the current object.
    }
    //useEffects will run after everytime react renders.
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newNote = formData.get("note");
     if (newNote.trim()) {
      setNotes([...notes, newNote]);
      form.reset();
    }
    // newNoteRef.current.scrollIntoView()
    // if we do this here would not work because we meed react to re-render in order for the last list item to be updated in DOM/UI.
  };

//element.scrollIntoView
//how do we get access to element?
// newNoteRef.scrollIntoView
// After we attach our ref to the last list item element we're referncing becomes "element"

  return (
    <article>
      <h1>Field Notes</h1>
      <div>
        <ul>
          {notes.map((msg, index) => (
            <li key={index} ref={index === notes.length - 1 ? newNoteRef: null}>{msg}</li>
            // we're attaching our ref if its last list item
            // newNodeRef.current will be our element. 
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="note"
            placeholder="Type your note..."
          />
          <button className="link" type="submit">
            Submit
          </button>
        </form>
      </div>
    </article>
  );
}
