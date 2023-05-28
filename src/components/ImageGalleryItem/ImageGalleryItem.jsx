import React from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItemStyled.css';

const ImageGalleryItem = ({
  description,
  smallImage,
  largeImage,
  openModal,
}) => {
  const handleClick = () => {
    openModal(largeImage, description);
  };

  return (
    <li className="Item__styled" onClick={handleClick}>
      <img
        src={smallImage}
        alt={description}
        data-large={largeImage}
        className="Item__image"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  description: PropTypes.string,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
