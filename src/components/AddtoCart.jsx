// Given the final ShoppingCart component (including all the JSX and event handlers), your job is to finish
//implementing both the reducer function as well as the calculateTotal function.

// calculateTotal takes in the cart and should return a single numeric value representing the total cost of all the items in the cart.

// For the reducer, look at the component to figure out which action types are being dispatched as well as the shape of the action objects.

// TASKS
// Render the appropriate UI if there are no items in the cart
// Give the user the ability to add items to the shopping cart
// Give the user the ability to remove items from the shopping cart
// Appropriately update the quantity of items in the shopping cart
// Appropriately calculate the total cost of all items in the shopping cart

import * as React from "react";

const products = [
  { id: 1, name: "Poké Ball", price: 10 },
  { id: 2, name: "Great Ball", price: 20 },
  { id: 3, name: "Ultra Ball", price: 30 },
];

function calculateTotal(cart) {
  const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  console.log("total", total);
  return total;
}

const initialState = [];

function reducer(cart, action) {
  switch (action.type) {
    case "add":
      const newProduct = products.find((product) => product.id === action.id);
      //we find the product we want to add to the cart from the products catalog

      const inCart = cart.find(item => newProduct.id === item.id );
      //in the ui it shows adding the same product increments. Our add to cart therefore has to be able to both add a new item or
      //increment the item if it's already in cart.

      if (!inCart) {
        return [...cart, { ...newProduct, quantity: 1 }];
        //if the item isn't in the cart we return the new array, spreading all existing products from the cart (copy) and then insert a new producdt object and add a
        //new property on that object "quantity" set to value of 1

        // The curly braces {} are not just indicating that this is JavaScript code; they are actually defining an
        // object literal, and the content inside them describes the properties of this new object.
      }

      return cart.map((product) =>
        //here we increment because it's already in cart.
      //use map to return a new array.
        product.id === action.id
        //find the product id we ant to take action on
          ? { ...product, quantity: Number(product.quantity) + 1 }
          //if we find it, we make a copy of the product's properties but update the quantity property and add one.
          //note quantity> product.quanity to access the object's quantity property.
          : product
      );
    case "update":
      if (action.adjustment === "increment") {

        //the increment and decrement action.types deal with the + - buttons on the cart
        return cart.map((item) =>
          item.id === action.id
        //locate our item we ant to adjust
            ? { ...item, quantity: Number(item.quantity) + 1 }
            //if we find it, we copy that product and it's properties, but ...item,
            //we access quantity property by item.quantity and add 1.


            //code works without number in my case.
            //if there was a risk of item.quantity ever being a string, the result of item.quantity "2" + 1 is concatenation.
            //I'd get "21"
            //If I were trying * or / division I'd get NaN.
            //+ results in concatenation

            //*  or / results in NaN if a string is atempted to be used in math operations.
            //good practice to explicity handle types were math is used to avoid bugs.

            //if you get your quantity from an api could receive string not number
            : item
        );
      }

      if (action.adjustment === "decrement") {
        const item = cart.find((item) => item.id === action.id);

        if (Number(item.quantity === 1)) {
          return cart.filter((item) => item.id !== action.id);
        }

        return cart.map((item) =>
          item.id === action.id
            ? { ...item, quantity: Number(item.quantity) - 1 }
            : item
        );
      }
      break;

    default:
      return cart;
  }
}

export default function ShoppingCart() {
  const [cart, dispatch] = React.useReducer(reducer, initialState);

  const handleAddToCart = (id) => dispatch({ type: "add", id });

  const handleUpdateQuantity = (id, adjustment) => {
    dispatch({
      type: "update",
      id,
      adjustment,
    });
  };

  return (
    <main>
      <h1>Poké Mart</h1>
      <section>
        <div>
          <ul className="products">
            {products.map((product) => (
              <li key={product.id}>
                {product.name} - ${product.price}
                <button
                  className="primary"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <hr />
      <aside>
        <div>
          <h2>Shopping Cart</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name}
                <div>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, "decrement")}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => handleUpdateQuantity(item.id, "increment")}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
            {!cart.length && <li>Cart is empty</li>}
          </ul>
        </div>
        <hr />

        <h3>Total: ${calculateTotal(cart)}</h3>
      </aside>
    </main>
  );
}
