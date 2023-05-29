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
  const [error, setError] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchImagesData = () => {
      setIsLoading(true);

      fetchImages(query, page)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          if (page === 1) {
            setImages(imagesArray);
            setImagesOnPage(imagesArray.length);
          } else {
            setImages(prevImages => [...prevImages, ...imagesArray]);
            setImagesOnPage(
              prevImagesOnPage => prevImagesOnPage + imagesArray.length
            );
          }

          setTotalImages(totalHits);
        })
        .catch(error => setError(error))
        .finally(() => setIsLoading(false));
    };

    fetchImagesData();
  }, [query, page]);

  const getSearchRequest = query => {
    setQuery(query);
    setPage(1);
    setImagesOnPage(0);
    setTotalImages(0);
    setImages(null);
    setError(null);
  };

  const onNextFetch = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const openModal = (imageUrl, imageDescription) => {
    setCurrentImageUrl(imageUrl);
    setCurrentImageDescription(imageDescription);
    setShowModal(true);
  };

  return (
    <div>
      <Searchbar onSubmit={getSearchRequest} />
      {error && <h2>Something went wrong. Try again.</h2>}
      {images && <ImageGallery images={images} onOpenModal={openModal} />}
      {isLoading && <Loader />}
      {imagesOnPage < totalImages && <Button onNextFetch={onNextFetch} />}
      {showModal && (
        <Modal
          onClose={toggleModal}
          currentImageUrl={currentImageUrl}
          currentImageDescription={currentImageDescription}
        />
      )}
    </div>
  );
};

export default App;
