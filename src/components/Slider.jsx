import * as React from "react"
import Slider from "./Slider"

function reducer(state, action) {
  if (action.type === "increment") {
    return {
      count: state.count + state.step,
      step: state.step,
    }
  } else if (action.type === "decrement") {
    return {
      count: state.count - state.step,
      step: state.step,
    }
  } else if (action.type === "reset") {
    return {
      count: 0,
      step: state.step,
    }
  } else if (action.type === "updateStep") {
    return {
      count: state.count,
      step: action.step,
    }
  } else {
    throw new Error("This action type isn't supported.")
  }
}

export default function Counter() {
  const [state, dispatch] = React.useReducer(reducer, {
    count: 0,
    step: 1
  })

  const handleIncrement = () => dispatch({type: "increment"})
  const handleDecrement = () => dispatch({type: "decrement"})
  const handleReset = () => dispatch({type: "reset"})
  const handleUpdateStep = (step) => dispatch({type: "updateStep", step})

  return (
    <main>
      <h1>{state.count}</h1>
      <div>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleReset}>0</button>
      </div>
      <Slider
        min={1}
        max={10}
        onChange={handleUpdateStep}
      />
    </main>
  )
}
