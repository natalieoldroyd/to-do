import * as React from "react"


export default function reducer(state, action) {
    if (action.type === "input") {
      return {
        ...state,
        [action.name]: action.value,
      }
    } else if (action.type === "submit") {
      return {
        ...state,
        submitting: true,
        success: false,
        error: null,
      }
    } else if (action.type === "success") {
      return {
        ...state,
        submitting: false,
        name: "",
        email: "",
        marketing: true,
        success: true,
      }
    } else if (action.type === "error") {
      return {
        ...state,
        submitting: false,
        success: false,
        error: action.error,
      }
    } else {
      throw new Error("This action type isn't supported.")
    }
  }


export default function Form () {
  const [state, dispatch] = React.useReducer(reducer, {
    name: "",
    email: "",
    marketing: true,
    submitting: false,
    error: null,
    success: false
  })

  const { name, email, marketing, submitting, error, success } = state

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "submit" })

    try {
      await subscribe({ name, email, marketing })
      dispatch({ type: "success" })
    } catch (e) {
      dispatch({ type: "error", error: e.message })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={(e) => dispatch({
            type: "input",
            name: "name",
            value: e.target.value
          })}
          value={name}
          required
          placeholder="Your name"
        />
        <label htmlFor="email-address">
          Email address
        </label>
        <input
          id="email-address"
          name="email"
          type="email"
          onChange={(e) => dispatch({
            type: "input",
            name: "email",
            value: e.target.value
          })}
          value={email}
          autoComplete="email"
          required
          placeholder="Email Address"
        />
        <button type="submit">Button</button>
      </div>
      <div>
        <label htmlFor="marketing">
          Marketing
        </label>
        <input
          id="marketing"
          name="marketing"
          type="checkbox"
          checked={marketing}
          onChange={(e) => dispatch({
            type: "input",
            name: "marketing",
            value: e.target.checkbox
          })}
        />
        <p>I agree to everything.</p>
      </div>
    </form>
  )
}
