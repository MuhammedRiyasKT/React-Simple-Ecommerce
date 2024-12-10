import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, deleteCart, clearCart } from "../Redux/cartSlice";
import { Form, Button } from "react-bootstrap";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";

function Cart() {
  const userCart = useSelector((state) => state.cartReducer);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    if (userCart?.length > 0) {
      setProductCount(userCart.length);
    } else {
      setProductCount(0);
    }
  }, [userCart]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (e, productId) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    }
  };

  const handleCheckout = () => {
    alert("Order placed successfully");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <>
      <Header />
      <h1 className="text-center">Cart</h1>
      <div className="container my-5">
        <h2 className="text-center mb-4">My Cart</h2>
        <div className="row">
          {/* Cart Items Section */}
          <div className="col-lg-8 col-md-7 col-12">
            {userCart.length > 0 ? (
              userCart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex flex-wrap align-items-center justify-content-between p-3 mb-3 border rounded"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="img-fluid mb-3 mb-md-0"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />

                  <div className="flex-grow-1 mx-md-3 text-center text-md-start mb-3 mb-md-0">
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="text-success mb-0">${item.price}</p>
                  </div>

                  <Form.Control
                    type="number"
                    value={item.quantity}
                    min="1"
                    style={{ width: "80px" }}
                    onChange={(e) => handleQuantityChange(e, item.id)}
                    className="mb-3 mb-md-0"
                  />

                  <p className="mb-3 mb-md-0 text-center ms-2">
                    ${item.totalPrice.toFixed(2)}
                  </p>

                  <Button
                    className="ms-md-2"
                    variant="outline-danger"
                    onClick={() => dispatch(deleteCart(item.id))}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center mt-5 text-danger fs-5">Cart is empty</div>
            )}
          </div>

          {/* Order Summary Section */}
          <div className="col-lg-4 col-md-5 col-12 mt-4 mt-md-0">
            <div className="p-4 border rounded">
              <h4 className="mb-4">Order Summary</h4>
              <p className="d-flex justify-content-between">
                <span>Count</span>
                <span>{productCount}</span>
              </p>
              <p className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>
                  $
                  {userCart
                    .reduce((total, item) => total + item.totalPrice, 0)
                    .toFixed(2)}
                </span>
              </p>
              <p className="d-flex justify-content-between">
                <span>Shipping</span>
                <span>Free</span>
              </p>
              <hr />
              <h5 className="d-flex justify-content-between">
                <span>Total</span>
                <span>
                  $
                  {userCart
                    .reduce((total, item) => total + item.totalPrice, 0)
                    .toFixed(2)}
                </span>
              </h5>
              <Button
                onClick={handleCheckout}
                variant="primary"
                className="w-100 mt-4"
              >
                Proceed to Checkout
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="outline-info"
                className="w-100 mt-3"
              >
                Shop More
              </Button>
              <Button
                onClick={() => dispatch(clearCart())}
                variant="outline-danger"
                className="w-100 mt-3"
              >
                Empty Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
