import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from '../services/pixaby-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesOnPage, setImagesOnPage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState(null);
  const [, setError] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);

  useEffect(() => {
    const isQueryChanged = query !== '';
    const isPageChanged = page !== 0 && page !== 1;

    if (isQueryChanged || isPageChanged) {
      setIsLoading(true);

      fetchImages(query, page)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          let newImages;
          let newImagesOnPage;

          if (isQueryChanged) {
            newImages = imagesArray;
            newImagesOnPage = imagesArray.length;
          } else {
            newImages = [...images, ...imagesArray];
            newImagesOnPage = imagesOnPage + imagesArray.length;
          }

          setImages(newImages);
          setImagesOnPage(newImagesOnPage);
          setTotalImages(totalHits);
        })
        .catch(error => setError(error))
        .finally(() => setIsLoading(false));
    }
  }, [query, page, images, imagesOnPage]);

  const getSearchRequest = query => {
    setQuery(query);
  };

  const onNextFetch = () => {
    setPage(page + 1);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const openModal = (imageUrl, imageDescription) => {
    setCurrentImageUrl(imageUrl);
    setCurrentImageDescription(imageDescription);
    setShowModal(!showModal);
  };

  return (
    <>
      <Searchbar onSubmit={getSearchRequest} />

      {images && <ImageGallery images={images} openModal={openModal} />}
      {isLoading && <Loader />}

      {imagesOnPage >= 12 && imagesOnPage < totalImages && (
        <Button onNextFetch={onNextFetch} />
      )}

      {showModal && (
        <Modal
          onClose={toggleModal}
          currentImageUrl={currentImageUrl}
          currentImageDescription={currentImageDescription}
        />
      )}
    </>
  );
};

export default App;
