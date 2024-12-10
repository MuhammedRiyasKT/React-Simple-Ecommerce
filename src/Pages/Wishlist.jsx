import React from "react";
import Header from "../Components/Header";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteWishlist } from "../Redux/wishlistSlice";
import { addCartItem } from "../Redux/cartSlice";


function Wishlist() {
  const dispatch = useDispatch();
  const userWishlist = useSelector((state) => state.wishlistReducer.wishlistItems);
  const userCart = useSelector((state)=> state.cartReducer)

  const handleCart = (product)=>{
    const extingProduct = userCart?.find((item)=>item.id==product.id)

    if(extingProduct){
       alert("product quantity incremented")
       dispatch(addCartItem(product))
       dispatch(deleteWishlist(product))
    }else{
      dispatch(addCartItem(product))
      dispatch(deleteWishlist(product))
    }
  }

  return (
    <>
      <Header />
      <h1>Wishlist</h1>
      <div className="container my-5">
        <h2 className="text-center mb-4">My Wishlist</h2>
        <div className="row g-4">
          {userWishlist.length > 0 ? (
            userWishlist.map((item) => (
              <div key={item.id} className="col-lg-3 col-md-6 col-sm-12">
                <Card className="shadow-sm">
                  <Card.Img
                    variant="top"
                    src={item.images || "https://via.placeholder.com/150"}
                    alt={item.title || "Product Image"}
                    className="img-fluid"
                  />
                  <Card.Body>
                    <Card.Title>{item.title.slice(0, 15) || "Product Title"}...</Card.Title>
                    <Card.Text className="text-success">
                      ${item.price || "0.00"}
                    </Card.Text>
                    <div className="d-flex gap-2">
                      <Button
                        onClick={() => dispatch(deleteWishlist({ id: item.id }))}
                        variant="danger"
                        className="w-50"
                      >
                        Delete <i className="fa-solid fa-trash"></i>
                      </Button>
                      <Button onClick={()=> handleCart(item)} variant="primary" className="w-50">
                        Add to <i className="fa-solid fa-cart-shopping"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-center">Your wishlist is empty.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
