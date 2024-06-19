import * as React from "react";

function ChildComponent({ children, onClick }) {
  console.count("Child component is rendering");

  return <button onClick={onClick}>{children}</button>;
  //onClick aka the handleIncrementFunction is invoked on click of button
  //this is lifting state, we add a new state variable called count and setCount
}

const MemoizedChildComponent = React.memo(ChildComponent);

export default function ParentComponent() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());
  const [count, setCount] = React.useState(0)
  //we increase this from the child.

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleIncrementCount = React.useCallback(() => {
//defined function here on parent to increment count
      setCount((count) => count + 1)
  }, [])


  return (
    <div>
      <p>Current time: {time}</p>
      <p>Count: {count}</p>
      <MemoizedChildComponent onClick={handleIncrementCount}>
        {/* here we pass that increment function to the child */}
        {/* note we pass the prop as onClick but it represnts the handleIncrementCount function */}
        Increment Count
      </MemoizedChildComponent>
    </div>
  );
}
