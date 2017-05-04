import React, {Component, PropTypes as PT} from "react";
import { connect } from "react-redux";
import LoginForm from "routes/Login/LoginForm";
import * as actions from "actions/login";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import {grey500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';
import ThemeDefault from '../../theme-default';

const Login = ({ loginRequest, inputChange, isFetching, email, password, errors, pause }) => {
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
          <div style={styles.loginContainer}>
            <Paper style={styles.paper}>
              <LoginForm
                  processing={isFetching}
                  email={email}
                  password={password}
                  pause={pause}
                  errors={errors}
                  login={ (loginData) => loginRequest(loginData) }
                  onChangeHandle={ (change) => inputChange(change) } />
            </Paper>
            <div style={styles.buttonsDiv}>
              <FlatButton
                label="Register"
                href="/signup"
                style={styles.flatButton}
                icon={<PersonAdd />}
              />

              <FlatButton
                label="Forgot Password?"
                href="/"
                style={styles.flatButton}
                icon={<Help />}
              />
            </div>
        </div>
      </MuiThemeProvider>
    );
};

Login.propTypes = {
    isFetching: PT.bool,
    errors: PT.object,
    loginRequest: PT.func,
    inputChange: PT.func,
    email: PT.string,
    password: PT.string
};

const mapStateToProps = ({ login }) => ({
    errors: login.errors,
    isFetching: login.isFetching,
    email: login.email,
    password: login.password,
    pause: login.pause
});

const mapDispatchToProps = dispatch => ({
    inputChange: (change) => dispatch(actions.loginInputChange(change)),
    loginRequest: (loginData) => {
        // Front Validation
        let newErrors = {};
        let hasErrors = false;
        let { email, password } = loginData;
        if ( !email || email.length < 2) {
            newErrors.email = "min 2";
            hasErrors = true;
        }
        if ( !password || password.length < 2) {
            newErrors.password = "min 2";
            hasErrors = true;
        }
        if ( !hasErrors ){
            dispatch(actions.loginRequest(loginData));
        } else {
            dispatch(actions.loginFailed(newErrors));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = {
  loginContainer: {
    minWidth: 280,
    maxWidth: 380,
    height: 'auto',
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto'
  },
  paper: {
    padding: '20px 20px 40px',
    overflow: 'auto'
  },
  buttonsDiv: {
    textAlign: 'center',
    padding: 10
  },
  flatButton: {
    color: grey500
  },
};
