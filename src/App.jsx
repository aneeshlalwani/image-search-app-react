import { useRef, useState, useEffect, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import "./index.css";
import axios from "axios";
import Logo from './assets/logo.jpg';
const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 20;

const App = () => {
  const searchInput = useRef(null);
  // hooks for storing images
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  // state for pagination
  const [page, setPage] = useState(1);
  // state for loading
  const [loading, setLoading] = useState(false);

  // function for fetching images
  const fetchImages = useCallback (async () => {
    try {
      if(searchInput.current.value){
        // setErrorMsg(' ');
        setLoading(true);
      const { data } = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value
        }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      
      );
      console.log(data);
      setImages(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
      }
    } catch (error) {
      // setErrorMsg('Error fetching images. Try again later.');
      console.log(error);
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  
  // function for resetting search
  const resetSearch = () => {
    setPage(1);
    fetchImages();
  }
  // function for getting input values
  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
    resetSearch();
  };

  // function for quick search option
  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    resetSearch();
  };
  console.log("page", page);
  return (
    <>

      <div className="container">
        <img src={Logo} alt="unsplash logo" className="logo"/>
        <h1 className="title">Unsplash Image Search</h1>
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
          <div onClick={() => handleSelection("watches")}>Watches</div>
          <div onClick={() => handleSelection("cats")}>Cats</div>
        </div>
        { loading ? (
          <p className="loading">Loading....</p> 
        ) : (
          <>
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
        <div className="buttons">
          {page > 1 && (
            <Button onClick={() => setPage(page - 1)}>Previous</Button>
          )}
          {page < totalPages && (
            <Button onClick={() => setPage(page + 1)}>Next</Button>
          )}
        </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
