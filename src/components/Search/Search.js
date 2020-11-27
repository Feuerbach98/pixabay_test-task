import React, { useCallback, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getImages } from '../../api/api';
import Masonry from 'react-masonry-css';
import './Search.css';

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

export const Search = () => {
  const storage = useSelector(store => store);
  const dispatch = useDispatch();

  const debounce = (f, delay) => {
    let timerId;
    console.log('init', timerId)
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(f, delay, ...args)
    }
  }

  const search = useCallback(async() => {
    console.log('searching')
    dispatch({
      type: 'ON_SEARCH',
      response: await getImages(storage.query, storage.perPage)
    })
  }, [dispatch, storage.perPage, storage.query])

  const debouncedSearch = useCallback(debounce(search, 1000), [])

  useEffect(() => {
    debouncedSearch();
  }, []);

  const handleChange = (event) => {
    console.log('hello')
    dispatch({
      type: 'ON_CHANGE',
      name: event.target.name,
      value: event.target.value
    })

    debouncedSearch();
  }

  const onImageLoad = (id) => {
    document.getElementById(id).style.background = 'none';
  }

  const images = storage.response.hits ? storage.response.hits.map(hit => {
    return (
      <a key={hit.id} href={hit.largeImageURL} target="_blank" rel="noreferrer">
        <img
          id={hit.id}
          className="image"
          alt={hit.tags}
          src={hit.webformatURL}
          onLoad={() => onImageLoad(hit.id)}
        ></img>
      </a>
    );
  }) : null;

  return (
    <div className="search">
      <Form className="d-flex d-flex justify-content-between">
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Control
            name="query"
            type="text"
            value={storage.query}
            onChange={handleChange}
            placeholder="Search"
          />
        </Form.Group>
        <Form.Group
          className="d-flex align-items-center"
          controlId="exampleForm.ControlSelect1"
        >
          <Form.Label className="my-0 mx-2">Count:</Form.Label>
          <Form.Control
            className="count"
            as="select"
            value={storage.perPage}
            onChange={handleChange}
            name="perPage"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Form.Control>
        </Form.Group>
      </Form>
      {storage.response.total === 0 ? (
        "There are no images that suits your criteria"
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images}
        </Masonry>
      )}
    </div>
  );
};
