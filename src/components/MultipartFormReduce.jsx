import * as React from "react";
import {useReducer} from "react";

const initialFormData = {
  name: "",
  email: "",
  address: "",
  city: "",
  zipcode: "",
  currentStep: 1
};

export default function MultistepFormReducer() {

  function reducer(state, action) {
    if (action.type === "input") {
      return {
        ...state,
        [action.name]: action.value
        //this syntax is used to represent each key on our state object.
        //interpret as email.name = e.target.value
      }
    }  else if (action.type === "submit") {
      return initialFormData
      //When you return { initialFormData } from a function, you are effectively doing:
      //return { initialFormData: initialFormData }

    }  else if(action.type === "increment"){
      return {
        ...state,
        currentStep: state.currentStep + 1
      }
    } else if (action.type === "decrement") {
      //remember must return ...state and then the changed key/value
        return {
          ...state,
            currentStep: state.currentStep - 1
        }
    } else {
      throw new Error ("This action type isn't supported.")
    }
  }


//   const [currentStep, setCurrentStep] = React.useState(1);
  // const [formData, setFormData] = React.useState(initialFormData);
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    address: "",
    city: "",
    zipcode: "",
    currentStep: 1
  })

  const {name, email, address, city, zipcode, currentStep} = state;

  const handleNextStep = () => {
    dispatch({type: "increment"});
  };

  const handlePrevStep = () => {
    dispatch({type: "decrement"})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({type: "submit"})
    alert("Thank you for your submission");
    // setFormData(initialFormData);
  };

  if (currentStep === 1) {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Personal Information</h2>
        <div>
          <label>Step {currentStep} of 3</label>
          <progress value={currentStep} max={3} />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            required
            name="name"
            id="name"
            placeholder="Enter your name"

            onChange={(e) => dispatch({
              type: "input",
              name: "name",
              value: e.target.value
            })}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            required
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value = {email}
            onChange={(e) => dispatch({
              type: "input",
              name: "email",
              value: e.target.value
            })}

          />
        </div>
        <button type="button" className="secondary" onClick={handleNextStep}>
          Next
        </button>
      </form>
    );
  } else if (currentStep === 2) {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Address</h2>
        <div>
          <label>Step {currentStep} of 3</label>
          <progress value={currentStep} max={3} />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            required
            name="address"
            id="address"
            type="address"
            placeholder="What is your address?"
            value={address}
            onChange={(e) => dispatch({
              type: "input",
              name: "address",
              value: e.target.value
            })}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            required
            name="city"
            id="city"
            placeholder="What city do you live in?"
            value={city}
            onChange={(e) => dispatch({
              type: "input",
              name: "city",
              value: e.target.value
            })}
          />
        </div>
        <div>
          <label htmlFor="zipcode">Zipcode</label>
          <input
            required
            name="zipcode"
            id="zipcode"
            type="number"
            placeholder="What is your zipcode?"
            value={zipcode}
            onChange={(e) => dispatch({
              type: "input",
              name: "zipcode",
              value: e.target.value
            })}
          />
        </div>
        <div>
          <button className="secondary" type="button" onClick={handleNextStep}>
            Next
          </button>
          <button type="button" className="link" onClick={handlePrevStep}>
            Previous
          </button>
        </div>
      </form>
    );
  } else if (currentStep === 3) {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Confirm your information:</h2>
        <div>
          <label>Step {currentStep} of 3</label>
          <progress value={currentStep} max={3} />
        </div>
        <table>
          <tbody>
            {Object.keys(state).map((key) => {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{state[key]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button className="primary" type="submit">
            Submit
          </button>
          <button type="button" className="link" onClick={handlePrevStep}>
            Previous
          </button>
        </div>
      </form>
    );
  } else {
    return null;
  }
}


//offical solution


// const initialState = {
//   currentStep: 1,
//   formData: {
//     name: "",
//     email: "",
//     address: "",
//     city: "",
//     zipcode: ""
//   }
// };

// function reducer(state, action) {
//   if (action.type === "next_step") {
//     return { ...state, currentStep: state.currentStep + 1 };
//   } else if (action.type === "prev_step") {
//     return { ...state, currentStep: state.currentStep - 1 };
//   } else if (action.type === "change") {
//     return {
//       ...state,
//       formData: { ...state.formData, [action.name]: action.value }
//     };
//   } else if (action.type === "reset") {
//     return initialState;
//   } else {
//     throw new Error("This action type isn't supported.")
//   }
// }

// export default function MultistepFormReducer() {
//   const [state, dispatch] = React.useReducer(reducer, initialState);

//   const handleNextStep = () => dispatch({ type: "next_step" });
//   const handlePrevStep = () => dispatch({ type: "prev_step" });

//   const handleChange = (e) => {
//     dispatch({
//       type: "change",
//       name: e.target.name,
//       value: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Thank you for your submission");
//     dispatch({ type: "reset" });
//   };

//   const { currentStep, formData } = state;

//   if (currentStep === 1) {
//     return (
//       <form onSubmit={handleSubmit}>
//         <h2>Personal Information</h2>
//         <div>
//           <label>Step {currentStep} of 3</label>
//           <progress value={currentStep} max={3} />
//         </div>
//         <div>
//           <label htmlFor="name">Name</label>
//           <input
//             required
//             name="name"
//             id="name"
//             placeholder="Enter your name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             required
//             name="email"
//             id="email"
//             type="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="button" className="secondary" onClick={handleNextStep}>
//           Next
//         </button>
//       </form>
//     );
//   } else if (currentStep === 2) {
//     return (
//       <form onSubmit={handleSubmit}>
//         <h2>Address</h2>
//         <div>
//           <label>Step {currentStep} of 3</label>
//           <progress value={currentStep} max={3} />
//         </div>
//         <div>
//           <label htmlFor="address">Address</label>
//           <input
//             required
//             name="address"
//             id="address"
//             type="address"
//             placeholder="What is your address?"
//             value={formData.address}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="city">City</label>
//           <input
//             required
//             name="city"
//             id="city"
//             placeholder="What city do you live in?"
//             value={formData.city}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="zipcode">Zipcode</label>
//           <input
//             required
//             name="zipcode"
//             id="zipcode"
//             type="number"
//             placeholder="What is your zipcode?"
//             value={formData.zipcode}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <button className="secondary" type="button" onClick={handleNextStep}>
//             Next
//           </button>
//           <button type="button" className="link" onClick={handlePrevStep}>
//             Previous
//           </button>
//         </div>
//       </form>
//     );
//   } else if (currentStep === 3) {
//     return (
//       <form onSubmit={handleSubmit}>
//         <h2>Confirm your information:</h2>
//         <div>
//           <label>Step {currentStep} of 3</label>
//           <progress value={currentStep} max={3} />
//         </div>
//         <table>
//           <tbody>
//             {Object.keys(formData).map((key) => {
//               return (
//                 <tr key={key}>
//                   <td>{key}</td>
//                   <td>{formData[key]}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <div>
//           <button className="primary" type="submit">
//             Submit
//           </button>
//           <button type="button" className="link" onClick={handlePrevStep}>
//             Previous
//           </button>
//         </div>
//       </form>
//     );
//   } else {
//     return null;
//   }
// }
