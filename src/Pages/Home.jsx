import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../Redux/productSlice";
import Pagination from "../Components/Pagination";
import "./Home.css";

function Home() {
  const { allProducts, error, loading } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const prodPerPage = 8;

  const endingIndex = currentPage * prodPerPage;
  const startingIndex = endingIndex - prodPerPage;
  const currentProducts = allProducts.slice(startingIndex, endingIndex);

  const totalPages = Math.ceil(allProducts.length / prodPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Header insideHome={true} />
      <h3>h</h3>
      <div className="text-center my-5">
        <h2>All Products</h2>
      </div>

      <div className="container">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <div className="text-center mt-5 text-danger">{error}</div>
        ) : currentProducts.length > 0 ? (
          <div className="row">
            {currentProducts.map((product, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
                <Card className="h-100">
                  <Link to={`/view/${product.id}`} className="text-decoration-none">
                    <div className="fixed-image-wrapper">
                      <Card.Img
                        className="p-2 img-fluid"
                        variant="top"
                        src={product.images[0]}
                        alt={product.title}
                      />
                    </div>

                  </Link>
                  <Card.Body>
                    <Card.Title className="fs-6 text-truncate">{product.title}</Card.Title>
                    <Button variant="outline-primary w-100">
                      <Link to={`/view/${product.id}`} className="text-decoration-none text-white">
                        View More
                      </Link>
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-5">Nothing to display</div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center my-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
