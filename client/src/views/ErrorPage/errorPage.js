import React from 'react';
import { Container, Grid, Link, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import img from 'assets/img/error-bg.jpg';

const useStyles = makeStyles({
   bgImg: {
      minHeight: '100vh',
      alignItems: 'center',
      backgroundImage: `url(${img})`
   },
   notFoundContainer: {
      top: '50%',
      left: '50%',
      color: '#FFF',
      width: '100%',
      padding: 0,
      zIndex: 3,
      position: 'absolute',
      maxWidth: 880,
      transform: 'translate(-50%,-50%)',
      textAlign: 'center',
   }
})

export default function ErrorPage() {
   const classes = useStyles();
   return (
      <div className={classes.bgImg}>
         <div className={classes.notFoundContainer}>
            <Container maxWidth="sm">
               <Grid item md={12}>
                  <Typography variant="h1" gutterBottom>
                     404
                  </Typography>
                  <Typography variant='h2' gutterBottom>
                     Page not found :(
                  </Typography>
                  <Typography variant='h4' gutterBottom>
                     oops! Looks like you got lost
                  </Typography>
                  <Typography variant='h3' gutterBottom >
                     <Link href="/">
                        <i className='fal fa-hand-point-left'></i> Back to main page
                     </Link>
                  </Typography>
               </Grid>
            </Container>
         </div>
      </div>

   )
}