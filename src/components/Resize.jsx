import * as React from "react";

export default function ReactRuler() {
  const [width, setWidth] = React.useState(null);
  const ref = React.useRef(null)
  //to observe an element in rect we need to use this set on the element we're observing.

  React.useLayoutEffect(() => {
    const observer = new ResizeObserver((entries, observer) => {
        setWidth(entries[0].borderBoxSize[0].inlineSize)
    })
    //observer is not necessary here.

    // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/ResizeObserver

    observer.observe(ref.current);
    //observe is a method on the observer we've just instantitated.
    //we're invoking a method on the instance of a class here which triggers the call back pased to observer to run again.

        return () => {
            observer.disconnect()
        }

        //clean up

  }, [])

  console.log('width', width)
  return (
    <section>
      <h1>React Ruler</h1>
      <p>(Resize the ruler)</p>
      <article ref={ref}>
        <label>width: {Math.floor(width)}</label>
      </article>
    </section>
  );
}
