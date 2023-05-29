// import React from 'react';
// import PropTypes from 'prop-types';
// import './ImageGalleryStyled.css';
// import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

// const ImageGallery = ({ images, openModal }) => {
//   return (
//     <ul className="List__styled">
//       {images.map(({ id, description, smallImage, largeImage }) => (
//         <ImageGalleryItem
//           key={id}
//           description={description}
//           smallImage={smallImage}
//           largeImage={largeImage}
//           openModal={openModal}
//         />
//       ))}
//     </ul>
//   );
// };

// ImageGallery.propTypes = {
//   images: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       description: PropTypes.string,
//       smallImage: PropTypes.string.isRequired,
//       largeImage: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   openModal: PropTypes.func.isRequired,
// };

// export default ImageGallery;
import React from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryStyled.css';

const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className="List__styled">
      {images.map(image => (
        <li className="Item__styled" key={image.id}>
          <img
            className="Item__image"
            src={image.smallImage}
            alt={image.description}
            onClick={() => onOpenModal(image.largeImage, image.description)}
          />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      smallImage: PropTypes.string.isRequired,
      largeImage: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
