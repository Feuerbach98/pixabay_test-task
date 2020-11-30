import React, { useState } from 'react';
import classNames from 'classnames';
import './Image.css';

export const Image = ({ hit }) => {
  const [loaded, setLoad] = useState(false);

  return (
    <img
      id={hit.id}
      className={classNames("image", { "preload-image": !loaded })}
      alt={hit.tags}
      src={hit.webformatURL}
      height="auto"
      onLoad={() => setLoad(true)}
    />
  );
}
