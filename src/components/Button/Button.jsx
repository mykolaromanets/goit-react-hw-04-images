import React from 'react';
import PropTypes from 'prop-types';
import './ButtonStyled.css';

const Button = ({ onNextFetch }) => {
  return (
    <button className="Btn__loadMore" type="button" onClick={onNextFetch}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onNextFetch: PropTypes.func.isRequired,
};

export default Button;
