import React from 'react'
import {connect} from 'react-redux'
import { signIn,signOut } from '../actions'
import { Link } from 'react-router-dom';
class LoginButton extends  React.Component{
    
    render(){
        return (
            <div >{this.renderAuthButton()}</div>
        )
    }
    renderAuthButton(){
        if(this.props.isSignedIn===null){
            return <div>null</div>
        }else if(this.props.isSignedIn){
            return  <button onClick={this.onSignOutClick} className='ui purple  button'>
            <i className="user outline icon"/>
            LogOut
        </button>
        }else{
            return <Link to='/login' className='ui button purple '>
            <i className="user outline icon"/>
            Login
        </Link>
        }
    }
    onSignOutClick=()=>{
      this.props.signOut()
  }

}
const mapStateToProps = (state)=>{
    return {isSignedIn : state.auth.isSignedIn}
}
export default connect(mapStateToProps,{signIn,signOut})(LoginButton);