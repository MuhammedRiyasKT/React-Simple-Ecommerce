import React from 'react';
import { Container, Form, Navbar, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { searchProducts } from '../Redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';

function Header({insideHome}) {
  const dispatch = useDispatch()
  const userWishlist = useSelector((state) => state.wishlistReducer.wishlistItems);
  const userCart = useSelector((state)=> state.cartReducer)
  return (
    <div>
      <Navbar expand="lg" className="bg-primary position-fixed w-100" style={{zIndex:"2"}}>
      <Container fluid>
        {/* Logo and Store Name */}
        <Link to="/" className="text-white text-decoration-none fw-bolder fs-4 d-flex align-items-center">
        <i className="fa-solid fa-truck me-2"></i> E Cart
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

          {/* Right-aligned Search Bar and Cart / Wishlist */}
          <Form className="d-flex align-items-center ms-auto">
            {
              insideHome &&
              <Form.Control
              onChange={e=> dispatch(searchProducts(e.target.value.toLocaleLowerCase()))}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ width: '250px' }}
            />
            }
            {/* Wishlist Icon with Badge */}
            <Link to={'/wishlist'} className="text-white mx-3">
              <i className="fa-solid fa-heart"></i>
              <Badge bg="warning" className="ms-1">{userWishlist?.length}</Badge>
            </Link>
            {/* Cart Icon with Badge */}
            <Link to={'/cart'} className="text-white">
              <i className="fa-solid fa-cart-shopping"></i>
              <Badge bg="warning" className="ms-1">{userCart?.length}</Badge>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default Header;
