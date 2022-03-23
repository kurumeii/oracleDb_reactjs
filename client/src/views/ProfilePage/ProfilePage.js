/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import { Grid } from "@material-ui/core";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import stylesProfile from "assets/jss/material-kit-react/views/profilePage.js";
import GridPhotos from "./components/GridPhotos";
import GridFavorite from "./components/GridFavorite";
import moment from "moment";
const useStyles = makeStyles({
  ...stylesProfile,
  textColorful: {
    background: 'linear-gradient(to right, #654ea3, #eaafc8)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700
  },
  nonStyleUL: {
    listStyle: 'none'
  },
  colorIcon: {
    color: '#654ea3'
  }
});

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle("Welcome page");
    document.title = title;
  }, [title])

  const [profilePic, setProfilePic] = useState(null);
  const [profileBg, setProfileBg] = useState(null);
  useEffect(() =>
    (async () => {
      await axios({
        method: "get",
        url: 'api/home/getprofile',
        proxy: {
          host: `localhost`,
          port: 5000,
          protocol: `http`
        }
      })
        .then(res => {
          setProfilePic(<img className={imageClasses} alt={res.data.image.fileName} src={res.data.image.src} />);
          setProfileBg(res.data.bg.src);
        })
        .catch(er => er.response ? alert(er.response.data) : er.request ? alert(er.message) : alert(er.config))
    })(), [])

  const ColorIcon = (props) => <i className={classNames(classes.colorIcon, props.icon)}></i>
  const Age = () => <span className={classes.textColorful}>{moment().year() - 1998}</span>
  return (
    <div>
      <Header
        color="transparent"
        brand="PORTFOLIO"
        rightLinks={<HeaderLinks />}
        absolute
        changeColorOnScroll={{
          height: 650,
          color: "dark",
        }}
        {...rest}
      />
      <Parallax filter image={profileBg} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    {profilePic}
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>Hoang Anh Nguyen (Kurumeii)</h3>
                    <h6>Frontend Developer</h6>
                    <Button href="https://twitter.com/Kurumeii" target="_blank" justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button href="https://www.instagram.com/__hoanhh/" target="_blank" justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button href="https://www.facebook.com/nguyenphuc.hoanganh.1" target="_blank" justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook-f"} />
                    </Button>
                    <Button href="https://www.youtube.com/channel/UCgrqQOjae9gCdY1Kfk1ePfQ" target="_blank" justIcon link className={classes.margin5}>
                      <i className={"fab fa-youtube"} />
                    </Button>
                    <Button href="https://discord.gg/xrCNd4E5fX" target="_blank" justIcon link className={classes.margin5}>
                      <ion-icon name="logo-discord"></ion-icon>
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                Welcome to my own <span className={classes.textColorful}>Portfolio</span> where you can see my stuffs and ... well, non-related others stuffs. For you see, i am a healthy <Age /> years old with highly interested in :
                <ul className={classes.nonStyleUL}>
                  <li>Watching anime <ColorIcon icon={"fad fa-tv"} /></li>
                  <li>Reading manga <ColorIcon icon={"fad fa-book-reader"} /></li>
                  <li>Coding <ColorIcon icon={"fad fa-code"}></ColorIcon></li>
                  <li>Football <small>or soccer</small> <ColorIcon icon={"fad fa-futbol"}></ColorIcon>
                  </li>
                  <li>PC Master race <ColorIcon icon={"fad fa-game-console-handheld"}></ColorIcon>
                  </li>
                  <li>Listening to music <ColorIcon icon={"fad fa-waveform"}></ColorIcon></li>
                </ul>
              </p>
            </div>
            <GridContainer spacing={3} justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Photos",
                      tabIcon: () => <i className="fal fa-images fa-2x"></i>,
                      tabContent: (
                        <div>
                          <Grid container spacing={3} justifyContent="center">
                            <Grid item xs={12} sm={12}>
                              <h3 className={classes.title}>
                                Here are some of my pictures
                              </h3>
                            </Grid>
                          </Grid>
                          <GridPhotos />
                        </div>
                      ),
                    },
                    {
                      tabButton: "Favorite",
                      tabIcon: () => <i className="fal fa-stars fa-2x"></i>,
                      tabContent: (
                        <div>
                          <Grid container spacing={3} justifyContent="center">
                            <Grid item xs={12} sm={12}>
                              <h3 className={classes.title}>
                                And these are my favorite artwork
                              </h3>
                            </Grid>
                          </Grid>
                          <GridFavorite />
                        </div>

                      ),
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
