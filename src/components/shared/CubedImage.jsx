import React from 'react';
import PropTypes from 'prop-types';

function CubedImage({ src, alt }) {
  return (
    <img className="rounded-lg object-cover h-60 w-60" src={src} alt={alt} />
  );
}

CubedImage.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
};

export default CubedImage;
