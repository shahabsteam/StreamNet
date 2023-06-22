import React from 'react'
import {connect} from 'react-redux'
import { signIn,signOut } from '../actions'
class GoogleAuth extends  React.Component{
    
    render(){
        return (
            <div >{this.renderAuthButton()}</div>
        )
    }
    renderAuthButton(){
        if(this.props.isSignedIn===null){
            return null
        }else if(this.props.isSignedIn){
            return <button onClick={this.onSignOutClick} className='ui red google button'>
                <i className="user outline icon"/>
                LogOut
            </button>
        }else{
            return <button onClick={this.onSignInClick} className='ui red google button'>
                <i className='google outline icon'/>
                Login With Google
            </button>
        }
    }
    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'145342807289-a5us7ha1cgr81b7np8mu1odp375vsbua.apps.googleusercontent.com',
                scope : 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn:this.onAuthChange(this.auth.isSignedIn.get())})
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
            
        });
    }
    onAuthChange = (isSignedIn)=>{
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getBasicProfile().zt)
        }else{
            this.props.signOut()
        }
    }
    onSignInClick=()=>{
        this.auth.signIn()
    }
    onSignOutClick=()=>{
        this.auth.signOut()
    }
}
const mapStateToProps = (state)=>{
    return {isSignedIn : state.auth.isSignedIn}
}
export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);