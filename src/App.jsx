import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import "./index.css";
import axios from "axios";

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 20;

const App = () => {
  const searchInput = useRef(null);
  // hooks for storing images
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // function for fetching images
  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value
        }&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      );
      console.log(data);
      setImages(data.results);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
      if (error.response) console.log(error.response.data);
    }
  };

  // function for getting input values
  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
    fetchImages();
  };

  // function for quick search option
  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    fetchImages();
  };

  return (
    <>
      <div className="container">
        <h1 className="title">Image Search From Unsplash</h1>
        <div className="search-section">
          <Form onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search image..."
              className="search-input"
              ref={searchInput}
            />
          </Form>
        </div>
        <div className="filters">
          <div onClick={() => handleSelection("nature")}>Nature</div>
          <div onClick={() => handleSelection("birds")}>Birds</div>
          <div onClick={() => handleSelection("space")}>Space</div>
          <div onClick={() => handleSelection("shoes")}>Shoes</div>
          <div onClick={() => handleSelection("cats")}>Cats</div>
        </div>
        <div className="images">
          {images.map((image) => {
            return (
              <img
                key={image.id}
                src={image.urls.small}
                alt={image.alt_description}
                className="image"
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
