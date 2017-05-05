import React, { Component } from 'react';
import PT from 'prop-types';
import { connect } from "react-redux";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as actions from "actions/signup";
import RegisterForm from './RegisterForm';
import Layout from '../Layout';

class Register extends Component {

	render() {
    const { errors, email, password, firstName, registerUser, inputChange } = this.props;

    return (
			<Layout title="Register">
				<div id="page-index" className="page" style={{paddingTop:60}}>
          <RegisterForm
              email={email}
              password={password}
              firstName={firstName}
              errors={errors}
              register={registerUser}
              onChangeHandle={inputChange} />
				</div>
			</Layout>);
	}
}

Register.propTypes = {
    errors: PT.object,
    registerUser: PT.func,
    inputChange: PT.func,
    firstName: PT.string,
    email: PT.string,
    password: PT.string
};

const mapStateToProps = ({ signup }) => ({
    errors: signup.errors,
    firstName: signup.firstName,
    email: signup.email,
    password: signup.password,
});

const mapDispatchToProps = dispatch => ({
    inputChange: (change) => dispatch(actions.signupInputChange(change)),
    registerUser: (userData) => {
        // Front Validation
        let newErrors = {};
        let hasErrors = false;
        let { email, password, firstName } = userData;
        if ( !firstName || firstName.length < 2) {
          newErrors.firstName = "First Name required";
          hasErrors = true;
        }
        if ( !email || email.length < 2) {
          newErrors.email = "Email required";
          hasErrors = true;
        }
        if ( !password || password.length < 2) {
          newErrors.password = "Password required";
          hasErrors = true;
        }
        if (!hasErrors ){
          dispatch(actions.signupRequest(userData));
        } else {
          dispatch(actions.signupFailed(newErrors));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
