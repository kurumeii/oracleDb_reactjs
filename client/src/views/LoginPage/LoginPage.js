/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
//Material-kit-styles
import matKitStyles from "assets/jss/material-kit-react/views/loginPage";
import checkboxstyle from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

//Others Components
import axios from 'axios'
import classNames from "classnames";
import UseLogin from './UseLoginForm';
import LoginCard from "./Components/LoginCard";
import SuccessCard from './Components/SuccessCard';
//------------
const useStyles = makeStyles({ ...matKitStyles, ...checkboxstyle });

export default function LoginPage() {
  const { userInfo: { loggedin, error } } = UseLogin();
  const [src, setSrc] = useState([]);
  const [index, setIndex] = useState(0);
  const classes = useStyles();


  useEffect(() => {
    document.title = "Login page";
  }, [])

  useEffect(() => {
    (async () => await axios(
      {
        method: 'get',
        url: 'api/login/getbackground',
        proxy: {
          host: 'localhost',
          port: 5000,
          protocol: 'http'
        }
      })
      .then(({ data }) => setSrc(data))
      .catch(err => err.response ? alert(err.response.data)
        : err.request ? alert(`Error: ${err.message}`) : alert(err.config))
    )()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setIndex(i => i + 1), 60000);
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <div
        className={classNames(classes.pageHeader,)}
        style={{
          backgroundImage: `url(${src[index % src.length]})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className={classes.container}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6} style={{ margin: "auto" }}>
              {loggedin ? <SuccessCard /> : <LoginCard message={error} />}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
