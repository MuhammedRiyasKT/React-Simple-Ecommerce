import React from "react";
import Header from "../Components/Header";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addWishlist } from "../Redux/wishlistSlice";
import { addCartItem } from "../Redux/cartSlice";

function View() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { allProducts, loading } = useSelector((state) => state.productReducer);
  const product = allProducts.find((item) => item.id.toString() === id);

  const dispatch = useDispatch();
  const userWishlist = useSelector((state) => state.wishlistReducer.wishlistItems);

  const handleWishlist = () => {
    if (userWishlist.some((item) => item.id === product.id)) {
      alert("Product already added to the wishlist");
    } else {
      dispatch(addWishlist(product));
      alert("Product added to wishlist");
    }
  };

  if (!loading && allProducts.length === 0) {
    navigate("/");
  }

  //cart

  const userCart = useSelector((state)=> state.cartReducer)

  const handleCartItme = ()=>{
     const exitingProduct = userCart?.find(item=>item.id === product.id)

     if(exitingProduct){
      dispatch(addCartItem)
      alert("product all ready added...")
     }else{
      dispatch(addCartItem(product))
      alert("product is added")
     }
  }

  return (
    <>
      <Header />
      <h1>View</h1>
      {product ? (
        <div className="container my-5">
          <div className="row g-4">
            <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center">
              <img
                src={product.images}
                alt="Product"
                className="img-fluid rounded"
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <span>Product ID: {product.id}</span>
              <h2 className="mb-3">{product.title}</h2>
              <h4 className="text-success mb-3">${product.price}</h4>
              <p className="text-muted">{product.description}</p>
              <div className="d-flex gap-3 mt-4">
                <Button onClick={handleCartItme} variant="outline-primary" className="px-4">
                  Add to <i className="fa-solid fa-cart-shopping"></i>
                </Button>
                <Button
                  onClick={handleWishlist}
                  variant="outline-danger"
                  className="px-4"
                >
                  Wishlist <i className="fa-solid fa-heart"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </>
  );
}

export default View;
