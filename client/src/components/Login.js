import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut, login , register } from '../actions';
import LoginForm from './streams/Auth/LoginForm';

class Login extends React.Component {
  onSubmit = (formValues,type) => {
    console.log(type);
    if(type==="login"){
this.props.login(formValues.username, formValues.password);
    }
    if(type==="register"){
this.props.register(formValues.username, formValues.password);
    }
    //this.props.login(formValues.username, formValues.password);
  };

  renderSuccess() {
    if (this.props.success) {
      return (
        <div className="ui success message">
          <div className="header">Success</div>
          <p>{this.props.success}</p>
        </div>
      );
    }
  }

  renderError() {
    if (this.props.error) {
      return (
        <div className="ui error message">
          <div className="header">Error</div>
          <p>{this.props.error}</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderSuccess()}
        {this.renderError()}
        <LoginForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    error: state.auth.error,
    success: state.auth.success,
  };
};

export default connect(mapStateToProps, { signIn, signOut, login,register })(Login);
