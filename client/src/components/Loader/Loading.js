import React from 'react'
import Loader from "react-loader-spinner";
import PropTypes  from 'prop-types';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

Loading.propTypes = {
   inProgress : PropTypes.bool.isRequired
}

Loading.defaultProps = {
   inProgress: false
}

function Loading(props) {
   const {inProgress} = props;

   return (
      inProgress && 
      <Loader
         type="Grid"
         color="#cecece"
         height={100}
         width={100}
      />
   );

}


export default Loading;