import React from 'react';
import { Discuss } from 'react-loader-spinner';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader__container">
      <Discuss
        visible={true}
        height="80"
        width="80"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#F4442E"
      />
    </div>
  );
};

export default Loader;
