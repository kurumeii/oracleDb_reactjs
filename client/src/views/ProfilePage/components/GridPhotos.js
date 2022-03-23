/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { CircularProgress } from "@material-ui/core";
import axios from 'axios';
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import ImageModal from '../../../components/ImageModal/modal';
// nodejs library that concatenates classes
import classNames from "classnames";

const useStyles = makeStyles({
   ...styles,
   hasPadding_sm: {
      marginTop: '10px',
      color: '#E100FF'
   },
   clickableImg: {
      cursor: 'pointer',
      transition: 'box-shadow .5s ease',
      '&:hover': {
         boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
      }
   }
});


export default function GridPhotos(props) {
   const classes = useStyles();
   const { ...rest } = props;
   const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
   const [isLoading, setIsLoading] = useState(true);

   const [srcp, setSrcp] = useState([]);
   useEffect(() =>
      (async () => {
         await axios({
            method: "get",
            url: 'api/home/getimage',
            proxy: {
               host: 'localhost',
               port: 5000,
               protocol: 'http'
            },
            onDownloadProgress: e => {
               let percentCompleted = Math.floor(e.loaded / e.total * 100);
               setIsLoading(true);
            }
         })
            .then(({ data }) => (setSrcp(data), setIsLoading(false)))
            .catch(err => err.response ? alert(err.response.data)
               : err.request ? alert(`Error: ${err.message}`) : alert(err.config))
      })(), [])
   const [openModal, setOpenModal] = useState({});
   const ListItem = () => srcp.map(({ fileName, src }) =>
      <GridItem key={fileName} xs={12} sm={12} md={4}>
         <img
            alt={fileName}
            src={src}
            className={classNames(navImageClasses, classes.clickableImg)}
            onClick={(e) => setOpenModal({ isOpen: true, src: e.currentTarget.src, alt: e.currentTarget.alt })}
         />
      </GridItem>
   );

   return (
      <GridContainer spacing={3} justify="center">
         {isLoading ? <CircularProgress className={classes.hasPadding_sm} disableShrink /> : <ListItem />}
         {openModal.isOpen ? <ImageModal src={openModal.src} alt={openModal.alt} onClose={() => setOpenModal({ isOpen: false })} /> : null}
      </GridContainer>
   )
}