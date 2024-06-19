import { useRef, useState } from "react"



export default function App() {
    const [active, setActive] = useState(false)
    const node = useRef(null)
    const animating = useRef(false)

    const handleToggle = () => {
      if (animating.current === false) {
        setActive(!active)
      }
    }

    return (
      <div
        ref={node}
        className={`diagram ${active ? "react-approach" : "trad-approach"}`}
      >
        <Diagram />
        <div className="toggle-diagram">
          <input
            id="toggle"
            className="toggle-input"
            type="checkbox"
            checked={active}
            onChange={handleToggle}
          />
          <label htmlFor="toggle" className="toggle-label">
            <div
              className="toggle-options"
              data-checked="React"
              data-unchecked="Traditional"
            >
              <div className="toggle-switch">
                <span className="toggle-marker">
                  <ReactLogo />
                </span>
              </div>
            </div>
          </label>
        </div>
      </div>
    )
  }


//   The ref={node} attribute on the <div> element tells React to store a reference to this DOM element
//   in the node.current property. After the component mounts, node.current will point to the corresponding
//   DOM element, and this reference will persist until the component unmounts.

//   node.current will point to the <div> element to which the ref={node} attribute is attached.
