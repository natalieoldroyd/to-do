***What are Side Effects?***

In React, a side effect refers to any operation that affects something outside the scope of the function being executed. This can include actions like updating the DOM, making API calls, setting up subscriptions or timers, and more. These operations are considered side effects because they interact with external systems or change the state in a way that isn't purely a result of rendering the component.

***How Do we Deal with Side Effects***

For example, calling an API to fetch data is a side effect because it involves communicating with an external server and updating the component state based on the response. This is different from pure functions in React, which take inputs (props and state) and return outputs (UI elements) without causing any side effects.

useEffect runs asynchronously after render. This is almost always what you want, as it optimizes for showing the UI to the user as quickly as possible.

Here's a basic example of using useEffect to call an API:

```
function DataFetchingComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}
export default DataFetchingComponent;

```



***When should we use a Clean up function and what do they do***

In the example provided, a cleanup function is not strictly necessary because the side effect (fetching data from an API) does not involve any ongoing subscriptions, timers, or other resources that need to be cleaned up.

However, if your side effect involved setting up something that requires cleanup (like a subscription, a WebSocket connection, or a timer), you would return a cleanup function from the useEffect hook. This cleanup function would be called when the component unmounts or before the effect re-runs due to changes in dependencies.

Here's an example of a useEffect hook with a cleanup function:

```
function CleanUp() {
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
       const intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1)
       }, 1000)

       return () => {
        clearInterval(intervalId)
       }
    }, [])

return (
    <div>
      Seconds: {seconds}
    </div>
  );
}
```
The cleanup function returned by the useEffect hook clears the interval when the component unmounts, preventing memory leaks and ensuring that the interval does not continue to run after the component is no longer in the DOM.
React provides the useEffect hook to handle side effects in functional components. This hook allows you to
perform side effects in a controlled manner, ensuring that they are executed at the right time in the component lifecycle.

Cleanup functions are necessary when dealing with side effects that involve ongoing processes or resources that need to be explicitly terminated

***When To Reach for an Event Handler and When useEffect***

In React, both event handlers and the useEffect hook are used to handle side effects, but they serve different purposes and are used in different scenarios. Here's a breakdown of when to use each:

***Use event handlers when you need to respond to user interactions or specific events***
These are typically used for actions that are triggered directly by user input, such as clicks, form submissions, key presses, etc.

Examples:

* Handling a button click to submit a form.
* Responding to a user typing in an input field.
* Handling a mouse hover event.

```
function ClickCounter() {
    const [count, setCount] = useState(0)

    const handleClick =()=> {
        setCount(prevCount => prevCount + 1)
    }

    This approach helps avoid issues related to stale state, especially in scenarios where state updates might be batched or when multiple state updates are triggered in quick succession.

    return {
       <div>
      <button onClick={handleClick}>Click me</button>
      <p>You've clicked {count} times</p>
    </div>
    }
}

export default ClickCounter;
```

***Use useEffect:***

When you need to perform side effects that are related to the component lifecycle, such as fetching data, setting up subscriptions, or cleaning up resources.


In this application, We're synchronizing the browser's dimensions with our component, so we'll use useEffect which updates some local state.

export default function App () {
  const [size, setSize] = React.useState({
    width: null,
    height: null
  })

  React.useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  stall(250)

  return (
    <section>
      <table>
        <tbody>
          <tr>
            <th>width</th>
            <td>{size.width}</td>
          </tr>
          <tr>
            <th>height</th>
            <td>{size.height}</td>
          </tr>
        </tbody>
      </table>
      <Browser size={size} />
    </section>
  )
}

When the component mounts:

The initial state { width: null, height: null } is rendered.
React schedules the useEffect to run after the render.
The useEffect runs, updates the state with the actual window dimensions, and triggers a re-render.

To avoid rendering with incorrect initial state values, you want the effect to run synchronously before the initial render. This ensures that the component's initial state is already synchronized with the browser's dimensions, preventing any flicker or unnecessary re-renders.

To achieve this, you can initialize the state with the current window dimensions directly. This way, the initial render will already have the correct dimensions, and useEffect will only be responsible for updating the state on subsequent window resize events. This is ONE option.

Another option is useLayoutEffect where we want to process state updates inside our component before the browser repaints the screen. useLayoutEffect: Runs synchronously after all DOM mutations but before the browser has a chance to paint. This ensures that any changes made inside useLayoutEffect are applied before the user sees anything on the screen.

If we want to ensure that the initial state of the component reflects the current window dimensions before the first paint, useLayoutEffect


***If a side effect is synchronizing your component with some outside system and that side effect needs to run *before* the browser paints the screen, put that side effect inside useLayoutEffect**


***useSyncExternalStore***

If a side effect is subscribing to an external store, use the useSyncExternalStore hook

```

const snapShot = () => {
    return navigator.onLine ? "online" : "offLine"
}

const subscribe = (callback) => {
    //unknown what callback is

    window.addEventListener("online", callback)
    window.addEventListener("offline", callback)

    return () => {
    window.removeEventListner("online", callback)
    window.removeEventListern("offline", callback)
    }

}
export default function NetworkIndicator {
    const networkStatus = React.useSyncExternalStore(snapshot, subcribe)

    return {
        <div>
        <span className={networkStatus}/>
        <label>{networkStatus</label>
        </div>
    }
}
```

***In scenarios where a piece of non-React state is already being managed by some outside system*** –  whether that's the browser, another library, or even your own custom data store – you can use React's built-in useSyncExternalStore hook to subscribe a component to that state without needing to redundantly duplicate it as React state in your component. in this one scenario, our State lives and is being managed by something outside of React.

subscribe and getSnapshot are outside of our component. **This is important** because if were inside each time NetworkIndicator re=rendered React would treat as a new function which would not be equal === to the previous function, the function is a referencial object. The new funciton would point to a new location in memory. Functions in JavaScript are referential objects, and defining a function inside a component means a new instance of that function is created on each render.

In JavaScript, functions are objects, and when you define a function inside another function (like a React component), a new instance of that inner function is created each time the outer function executes. This means that each instance of the inner function has its own unique reference in memory.

Every time NetworkIndicator re-renders, if we had defined subscribe inside of the component, React thinks it's a new function and will un-subscribe then re-subscribe to the store. That's obviously not ideal.
