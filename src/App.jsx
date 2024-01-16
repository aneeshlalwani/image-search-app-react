import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';
import './index.css';

const API_URL = 'https://api.unsplash.com/search/photos';

const App = () => {
  const searchInput = useRef(null);

  const handleSearch = ((event) => {
      event.preventDefault();
      console.log(searchInput.current.value);
  });

  // function for quick search option
  const handleSelection = (selection) =>{
      searchInput.current.value = selection;
  }
  
  return (
    <>
        <div className="container">
          <h1 className="title">Image Search From Unsplash</h1>
          <div className="search-section">
            <Form onSubmit={handleSearch}>
              <Form.Control 
                  type='search'
                  placeholder='Search image...'
                  className='search-input'
                  ref={searchInput}
              />
            </Form>
          </div>
          <div className="filters">
            <div onClick={() => handleSelection('nature')}>Nature</div>
            <div onClick={() => handleSelection('birds')}>Birds</div>
            <div onClick={() => handleSelection('space')}>Space</div>
            <div onClick={() => handleSelection('shoes')}>Shoes</div>
            <div onClick={() => handleSelection('cats')}>Cats</div>
          </div>
        </div>
    </>
  );
}

export default App;
