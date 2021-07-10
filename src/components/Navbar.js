import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react';

const Navbar = ({ click, user }) => {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h2>Amazon Shopping </h2>
      </div>

      <ul className="navbar__links">
        {/* <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li> */}
        <li>
          {!user && <React.Fragment>
            <NavLink to="/login">
              Login
          </NavLink>
          </React.Fragment>}
        </li>
        <li>
          {!user && <React.Fragment>
            <NavLink to="/register">
              Register
          </NavLink>
          </React.Fragment>}
        </li>

        <li>
          {user && <NavLink to="/">
            Welcome, {user.name}
          </NavLink>}
        </li>
        <li>
          {user && <NavLink to="/logout">
            Logout
          </NavLink>}
        </li>
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">Shop</Link>
        </li>
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav >
  );
};

export default Navbar;