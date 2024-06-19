import * as React from "react";
import { closeIcon } from "./icons";
import {useState, useRef,useEffect} from "react";

export default function ClickOutside() {
  // const isOpen = false;

  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef(null);

  const handleOpenModal = () => {
    if (isOpen === true) {
        setIsOpen(false)
    }
  };

  const handleCloseModal = (event) => {;
    setIsOpen(false)

  };

  useEffect(() => {
    if (isOpen === true) {
      const handleEvent = (e) => {
        const element = modalRef.current;
        //modalRef.curent is our element in the dom.
        if (element && !element.contains(e.target)) {
          setIsOpen(false)
        }
      }

      document.addEventListener("pointerdown", handleEvent)
      //event listern on entire document.

      return () => {
        return document.removeEventListener("pointerdown", handleEvent)
      }
    }
  }, [isOpen])


//when should we use useEffect?
//calling an exernal API
//Web API methods, local storage, scrollIntoView
//using native DOM methods like document.getElement or document.addEventListener.

  return (
    <>
      <section>
        <h1>Click Outside</h1>
        <button className="link" onClick={handleOpenModal}>
          Open Modal
        </button>
      </section>
      {isOpen && (
        // in order to know if the user is clicking inside or outisde the modal we need a ref to it in the DOM
        <dialog ref={modalRef}>
          <button onClick={handleCloseModal}>{closeIcon}</button>
          <h2>Modal</h2>
          <p>
            Click outside the modal to close (or use the button) whatever you
            prefer.
          </p>
        </dialog>
      )}
    </>
  );
}
