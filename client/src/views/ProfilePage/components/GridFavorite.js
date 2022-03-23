import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import axios from 'axios';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import classNames from "classnames";
import ImageModal from '../../../components/ImageModal/modal';

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

export default function GridFavorite(props) {
   const classes = useStyles();
   const { ...rest } = props;
   const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
   const [isLoading, setIsLoading] = useState(true);
   const [srcp, setSrcp] = useState([]);
   useEffect(() =>
      (async () => {
         await axios({
            method: 'get',
            url: '/api/home/getfavorite',
            proxy: {
               host: 'localhost',
               port: 5000,
               protocol: 'http'
            },
            onDownloadProgress: () => setIsLoading(true)
         })
            .then(({ data }) => (setSrcp(data), setIsLoading(false)))
            .catch(er => er.response ? alert(er.response.data)
               : er.request ? alert(er.message)
                  : alert(er.config))
      })(), [])
   const [openModal, setOpenModal] = useState({});

   const ListItem = () => srcp.map(({ fileName, src }) =>
      <GridItem key={fileName} xs={12} sm={12} md={4} {...rest}>
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
         {openModal.isOpen ? <ImageModal src={openModal.src} alt={openModal.alt} onClose={() => setOpenModal({isOpen: false})} /> : null}
      </GridContainer>
   )
}