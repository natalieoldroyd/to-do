In React, your view is a function of your state – both of which you encapsulate inside of a component.
To get your application, you compose all of your components together.

To get data down the component tree, you use props. To get data up the component tree, you use callbacks.


If you have a side effect that is triggered by an event, put it in an event handler. If you have a side effect
that is synchronizing your component with some outside system, put it inside of useEffect.

 If you need to preserve a value across renders, but that value has nothing to do with the view, and therefore,
 React doesn't need to re-render when it changes, put it in a ref using useRef.

React creates an abstraction over the view (DOM) so you don't have to directly interact with it. If you manipulate the DOM by for example
grabbing document.getElementById("example") using a method like:

    const handleClick = (type) => {
    document.getElementsByClassName(type)[0].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    })

React does not know about these changes.

Can use useRef in this case. useRef returns an object with a single property

if we pass a ref as a prop to a React element, React will put a reference to the DOM node it creates into that ref's current property.
