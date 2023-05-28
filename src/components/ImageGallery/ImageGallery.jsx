import React from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryStyled.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className="List__styled">
      {images.map(({ id, description, smallImage, largeImage }) => (
        <ImageGalleryItem
          key={id}
          description={description}
          smallImage={smallImage}
          largeImage={largeImage}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string,
      smallImage: PropTypes.string.isRequired,
      largeImage: PropTypes.string.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
