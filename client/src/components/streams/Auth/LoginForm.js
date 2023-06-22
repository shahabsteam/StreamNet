// import GoogleAuth from '../../GoogleAuth';
import { Field, reduxForm } from 'redux-form';
import React from 'react';

class LoginForm extends React.Component {
  state = {
    submittedButton: null,
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message small">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const classname = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={classname}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues, this.state.submittedButton);
  };

  handleButtonClick = (buttonName) => {
    this.setState({ submittedButton: buttonName });
  };

  render() {
    return (
      <div className="ui segment">
        <h3 className="ui header">Login Form</h3>
        <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="field">
            <label>Username</label>
            <Field component={this.renderInput} type="text" name="username" placeholder="Enter your username" />
          </div>
          <div className="field">
            <label>Password</label>
            <Field type="password" name="password" placeholder="Enter your password" component={this.renderInput} />
          </div>
          <div className="ui centered grid">
            <div className="row">
              <div className="column">
                <button
                  className="ui primary button"
                  type="submit"
                  onClick={() => this.handleButtonClick('login')}
                  style={{ margin: '0.5rem', padding: '1rem' }}
                >
                  Login
                </button>
              </div>
              <div className="column">
                <button
                  className="ui secondary button"
                  type="submit"
                  onClick={() => this.handleButtonClick('register')}
                  style={{ margin: '0.5rem', padding: '1rem' }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
        {/* <GoogleAuth /> */}
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.username) {
    errors.username = 'Enter username';
  }
  if (!formValues.password) {
    errors.password = 'Enter password';
  }
  return errors;
};

export default reduxForm({
  form: 'LoginForm',
  validate: validate,
})(LoginForm);
