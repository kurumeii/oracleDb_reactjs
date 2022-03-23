import React, { useEffect, useState } from "react";
import { InputAdornment, makeStyles, FormControlLabel, Checkbox, FormHelperText } from "@material-ui/core";
import { Check } from '@material-ui/icons';
//Material-kit-styles
import Card from "components/Card/Card.js"
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from 'components/CustomButtons/Button.js';
import matKitStyles from "assets/jss/material-kit-react/views/loginPage";
import checkboxstyle from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";
import PropsTypes from 'prop-types'
//Others Components
import UseLogin from '../UseLoginForm';
//------------
const useStyles = makeStyles({ ...matKitStyles, ...checkboxstyle });

function LoginCard(props) {
   const { message } = props;

   const {
      userInfo: { errorUser, errorPass, isRemember, isSending }
      , setUsername, setPassword, setRemember
      , login
   } = UseLogin();

   const [cardAni, setCardAni] = useState("cardHidden");
   useEffect(() => {
      setTimeout(() => setCardAni(""), 700);
      return () => clearTimeout();
   }, [])

   const classes = useStyles();
   return (
      <Card className={classes[cardAni]}>
         <form className={classes.form}>
            <CardHeader color="primary" className={classes.cardHeader}>
               <h4 style={{ textAlign: "center", fontSize: "2em" }}>Signing in</h4>
            </CardHeader>
            <CardBody>
               {message && <h3>{message}</h3>}
               <CustomInput
                  id="username"
                  labelText="Tài khoản đăng nhập..."
                  formControlProps={{
                     fullWidth: true,
                     color: "primary",
                  }}
                  error={errorUser !== "" ? true : false}
                  color="primary"
                  inputProps={{
                     type: "text",
                     autoComplete: "off",
                     endAdornment: (
                        <InputAdornment position="end">
                           <i className={`fal fa-user-tie fa-lg ${classes.inputIconsColor}`}></i>
                        </InputAdornment>
                     ),
                     onChange: (e) => setUsername(e.target.value),
                     error: errorUser !== "" ? true : false,
                  }}
               >
                  {errorUser && <FormHelperText>{errorUser}</FormHelperText>}
               </CustomInput>
               <CustomInput
                  id="password"
                  labelText="Mật khẩu đăng nhập..."
                  formControlProps={{
                     fullWidth: true,
                     color: "primary",
                  }}
                  color="primary"
                  error={errorPass !== "" ? true : false}
                  inputProps={{
                     type: "password",
                     autoComplete: "off",
                     endAdornment: (
                        <InputAdornment position="end">
                           <i className={`fal fa-fingerprint fa-lg ${classes.inputIconsColor}`}></i>
                        </InputAdornment>
                     ),
                     onChange: (e) => setPassword(e.target.value),
                     error: errorPass ? true : false,
                  }}
               >
                  {errorPass && <FormHelperText>{errorPass}</FormHelperText>}
               </CustomInput>
               <div className={classes.checkboxstyle}>
                  <FormControlLabel
                     id='isRemember'
                     control={
                        <Checkbox onClick={(e) => setRemember(e.target.checked)}
                           checked={isRemember}
                           icon={<Check className={`${classes.uncheckedIcon}`}></Check>}
                           checkedIcon={<Check className={`${classes.checkedIcon}`}></Check>}
                           classes={{ checked: classes.checked }}
                        />
                     }
                     classes={{ label: classes.label }}
                     label="Ghi nhớ đăng nhập"

                  />
               </div>

            </CardBody>
            <CardFooter className={classes.cardFooter}>
               <Button simple color="primary" size="lg" onClick={login} disabled={isSending}> Đăng nhập </Button>
            </CardFooter>
         </form>
      </Card>
   )
}

LoginCard.propTypes = {
   message: PropsTypes.string
}

export default LoginCard