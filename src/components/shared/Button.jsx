import React from 'react';
import PropTypes from 'prop-types';

function Button({ name, bgColor, onClick }) {
  return (
    <button className={`rounded-full px-4 py-2 text-white ${bgColor}`} onClick={onClick}>
      {name}
    </button>
  );
}

Button.propTypes = {
  bgColor: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
