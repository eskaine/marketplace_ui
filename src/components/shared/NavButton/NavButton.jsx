import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavButton.css';

const NavButton = ({ name, url, style }) => {
  const navigate = useNavigate();

  return (
    <button className={style} onClick={() => navigate(url)}>{name}</button>
  );
};

NavButton.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  style: PropTypes.string,
};

export default NavButton;
