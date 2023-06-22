

import React from 'react'
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';
//how can we connect both connect and redux form ?
 class StreamCreate extends React.Component{
     
     onSubmit=(formValues)=>{

         this.props.createStream(formValues)
     }
    render(){
        if (this.props.error) {
            return (
              <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit}/>
                <div className="ui error message">
                  <div className="header">An error occurred:</div>
                  <p>{this.props.error}</p>
                  </div>

            
              </div>
            );
          }

        return(
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
           
        )
    }
}
const mapStateToProps=(state)=>{
    return {
            error : state.streams.error,
       }
}

export default connect(mapStateToProps,{createStream})(StreamCreate)