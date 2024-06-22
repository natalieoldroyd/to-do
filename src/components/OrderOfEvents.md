***Order of events when state or props change for a React Component***


* Render: Calculate what needs to be displayed based on props and state.
    - When state or props change, React schedules a re-render of the component. During this phase, React calls the component function where you define your JSX and other logic. This is where React determines what the UI should look like based on the current state and props.
* Commit: Apply changes to the DOM.
    - After determining the changes in the render phase, React updates the DOM to reflect the new output of the render. If there are any differences between the new result and the previous render, React applies these changes to the DOM.
* Effects: Execute useEffect callbacks after the DOM has been updated.
    - After the DOM has been updated, React runs the effects scheduled with useEffect. The effects run after the paint, ensuring that any changes to the DOM are visible to the user before the effects execute. This is useful for tasks that need to interact with the updated DOM or perform side effects like fetching data, setting up subscriptions, or manually manipulating the DOM.

This order ensures that the user interface is up-to-date before executing potentially heavy or non-UI related work in useEffect.

***Updating the DOM vs Painting***

The terms "updating the DOM" and "painting to the screen" refer to two distinct phases in the process of rendering web content, and understanding the difference is crucial for optimizing web applications, especially in complex frameworks like React.

Updating the DOM
"Updating the DOM" refers to the process where the Document Object Model (DOM) — the structure that represents the document in the browser — is modified. This involves making changes to the HTML elements and their attributes based on the logic defined in your JavaScript code. For example, when you change the text inside an HTML element or toggle a CSS class on an element, you are updating the DOM.

Painting to the Screen
"Painting to the screen," on the other hand, is the process where the browser takes the updated DOM and visually renders it on the user's screen. This involves converting the DOM and CSSOM (CSS Object Model) into visual pixels on the screen. Painting is typically done by the browser's rendering engine and includes several steps:

Layout (Reflow): The browser calculates the geometry of each visible element, determining where and how elements should appear relative to each other. This includes calculating sizes, positions, and other layout properties.

Paint: During the paint stage, the browser fills out pixels for each element. It draws out the visual representation of borders, colors, backgrounds, text, etc., based on the computed styles from the layout phase.

Composite: If elements overlap or require layering (due to properties like z-index), the browser will layer the elements on top of one another in the correct order. This might involve creating layers that can be manipulated independently and then composited together to form the final image that the user sees.

Why the Distinction Matters
Understanding the distinction between updating the DOM and painting to the screen is important for performance reasons. DOM manipulations can be expensive because they might trigger a reflow (layout calculation) and repaint, both of which are resource-intensive operations. However, not all DOM updates lead directly to a repaint or reflow; browsers optimize these processes and batch updates to minimize performance hits.

In the context of React and particularly with hooks like useEffect and useLayoutEffect, managing when and how these updates happen can significantly impact performance and user experience. useLayoutEffect allows you to make changes to the DOM and perform measurements or manipulations before the browser paints, ensuring that the changes are visually reflected immediately after updates without causing flickering or layout shifts.

In summary, while updating the DOM is about changing the structure and content of the web page, painting is about rendering the visual representation of these changes on the screen. Efficiently managing these processes is key to building smooth and responsive web applications.


useEffect runs after the render is committed to the screen. This means that the DOM has been painted, and the browser has performed layout and paint operations.
Use Case: It is suitable for operations that do not require immediate DOM updates, such as fetching data, setting up subscriptions, or logging. Example, we need to monitor for size of an element the user can expand or contract. 


