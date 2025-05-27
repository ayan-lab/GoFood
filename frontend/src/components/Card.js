import React, { useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const options = props.options;
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]); // Default to first size option

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food.length !== 0) {
      //updating
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: options[size] * qty,
          qty: qty,
        });
        return;
      } 
      else if (food.size !== size) {
        //adding
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: options[size] * qty,
          qty: qty,
          size: size,
        });
        return;
      }
      return;
    }
    //default adding
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: options[size] * qty,
      qty: qty,
      size: size,
    });
  };

  return (
    <div
      className="card mt-3 d-flex flex-column justify-content-center align-items-center"
      style={{ maxWidth: "20rem", maxHeight: "450px" }}
    >
      <img
        src={props.foodItem.img}
        className="card-img-top"
        alt={props.foodItem.name}
        style={{ maxHeight: "190px" }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <p className="card-text">{props.foodItem.desc}</p>
        <div className="container w-100">
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => setQty(e.target.value)}
            value={qty}
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => setSize(e.target.value)}
            value={size}
          >
            {priceOptions.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <span className="fs-5 h-100">
            Total Price: {options[size] ? options[size] * qty : 0}/-
          </span>
        </div>
        <hr />
        <button
          className="btn btn-success justify-center ms-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;
