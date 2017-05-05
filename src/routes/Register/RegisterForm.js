import React, { Component } from "react";
import PT from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

class RegisterForm extends Component {

    static propTypes = {
        errors: PT.object,
        email: PT.string,
        password: PT.string,
        firstName: PT.string,
        register: PT.func,
        onChangeHandle: PT.func
    }

    static defaultProps = {
        errors: {},
        email: '',
        password: '',
        firstName: '',
        register: () => {},
        onChangeHandle: () => {}
    }

    onChangeHandle(e, value) {
        this.props.onChangeHandle({ [e.target.name]: e.target.value });
    }

    submit(e) {
        e.preventDefault();
        const { email, password, firstName } = this.props;
        this.props.register({ email, password, firstName });
    }

    render() {

        const { errors, email, password, firstName } = this.props;
        const error_message = errors.firstName || errors.email || errors.password ||
          errors.message || false;

        return (
            <form>
                <h2>Register</h2>
                <hr />
                  <TextField
                    name="firstName"
                    hintText="First Name"
                    floatingLabelText="First Name"
                    fullWidth={true}
                    value={firstName}
                    onChange={::this.onChangeHandle}
                  />
                  <TextField
                    name="email"
                    hintText="E-mail"
                    floatingLabelText="E-mail"
                    fullWidth={true}
                    value={email}
                    onChange={::this.onChangeHandle}
                  />
                  <TextField
                    name="password"
                    hintText="Password"
                    floatingLabelText="Password"
                    fullWidth={true}
                    type="password"
                    value={password}
                    onChange={::this.onChangeHandle}
                  />
                  <div>
                    <RaisedButton
                      primary={true}
                      style={styles.loginBtn}
                      onTouchTap={::this.submit}>
                        Register
                    </RaisedButton>
                  </div>
                  <Snackbar
                     open={!!error_message}
                     message={error_message}
                     autoHideDuration={2000}
                  />
            </form>
        );
    }
}

export default RegisterForm;

const styles = {
  loginBtn: {
    float: 'right'
  },
};
