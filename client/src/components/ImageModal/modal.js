import React, { useState } from 'react'
import Loading from "../Loader/Loading";
import Lightbox from 'react-image-lightbox'
import PropTypes from 'prop-types'
import 'react-image-lightbox/style.css'


function ImageModal(props) {
   const { src, alt, onClose } = props;
   // eslint-disable-next-line no-unused-vars
   const [status] = useState(true);
   return (
      <>
         {status &&
            (<Lightbox
               mainSrc={src}
               imageCaption={alt}
               onCloseRequest={() => onClose(false)}
               loader={<Loading inProgress={true} />}
               discourageDownloads={false}
               clickOutsideToClose={true}
               //others options
               imageLoadErrorMessage = {'This image failed to load'}
               enableZoom = {false}
               // mainSrcThumbnail = {src}
               // imagePadding = {10}
               // toolbarButtons = {''}
               // onImageLoad = {(imageSrc, srcType, img) => console.log(imageSrc, srcType, img)}
            />)
         }
      </>

   )
}
ImageModal.propTypes = {
   src: PropTypes.string,
   alt: PropTypes.string,
   onClose: PropTypes.any,
}


export default ImageModal;