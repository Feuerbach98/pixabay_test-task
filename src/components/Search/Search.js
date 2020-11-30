import React, { useCallback, useEffect } from 'react';
import './Search.css';

import { getImages } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store/store';

import Masonry from 'react-masonry-css';
import { debounce } from 'lodash';
import { Image } from '../Image';
import { Inputs } from '../Inputs';

const breakpointColumns = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

export const Search = () => {
  const storage = useSelector(store => store);
  const dispatch = useDispatch();

  useEffect(() => {
    debouncedSearch(storage.query, storage.perPage);
  }, [storage.query, storage.perPage]);

  const search = async(query, perPage) => {
    dispatch(await actions.search(getImages, query, perPage))
  }

  const debouncedSearch = useCallback(debounce(search, 1000), [])

  const images = storage.response.hits && storage.response.hits.map(hit => {
    return (
      <a key={hit.id} href={hit.largeImageURL} target="_blank" rel="noreferrer">
        <Image hit={hit}/>
      </a>
    );
  });

  return (
    <div className="search">
      <Inputs query={storage.query} perPage={storage.perPage} />
      {storage.response.total === 0 ? (
        "There are no images that suits your criteria"
      ) : (
        <Masonry
          breakpointCols={breakpointColumns}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid__column"
        >
          {images}
        </Masonry>
      )}
    </div>
  );
};
