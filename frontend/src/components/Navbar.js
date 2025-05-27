import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../pages/Cart";

function Navbar() {

  const [cartview, setCartview] = useState(false);

  const navigate = useNavigate();
  const handlelogout = ()=>{
    localStorage.removeItem("authToken");
    navigate("/login")

    //
  }
  let data = useCart();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-1 fst-italic" to="#">
          GoFood 
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item active">
              <Link className="nav-link active fs-5" to="/">
                Home
              </Link>
            </li>

            {/*conditional rendering of login signup*/}

            {localStorage.getItem("authToken") ? (
              <li className="nav-item active">
                <Link className="nav-link active fs-5" to="/">
                  My orders
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>

          {!localStorage.getItem("authToken") ? (
            <div>
              <Link className="btn bg-white text-success mx-1 " to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1 " to="/register">
                Register
              </Link>
            </div>
          ) : (
            <div>
              <div className="btn bg-white text-success mx-2" onClick={()=>{setCartview(true)}}>Cart{" "}
                {data.length > 0 ? <Badge pill bg="danger">{data.length}</Badge>: null}
              </div>
              {cartview ? <Modal onClose={()=>{setCartview(false)}} ><Cart /></Modal> : null}
              <div className="btn bg-danger text-white mx-2" onClick={handlelogout}>Logout</div>
            </div>
          )}
        </div>
      </nav>  
    </>
  );
}

export default Navbar;
