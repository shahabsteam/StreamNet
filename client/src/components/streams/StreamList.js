import React from 'react'
import { connect } from 'react-redux';
import {fetchStreams} from '../../actions'
import { Link } from 'react-router-dom';
class StreamList extends React.Component{
    componentDidMount(){
        this.props.fetchStreams()
    }
    renderAdmin(stream){
        if(stream.userEmail===this.props.currentUserEmail){
            return (
            <div className='right floated content'>
                <Link className='ui button purple' to={`/streams/edit/${stream.id}`}>Edit</Link>
                <Link  to={`/streams/delete/${stream.id}`}
                className='ui button negative'>Delete</Link>
            </div>)

        }
    }
    renderList() {
        return this.props.streams.map((stream) => {
          if (stream.id) {
            return (
              <div className="item" key={stream.id}>
                {this.renderAdmin(stream)}
                <i className="large middle aligned icon play" />
                <div className="content">
                  <Link to={`streams/${stream.id}`}>{stream.title}</Link>
                  <div className="description">{stream.description}</div>
                </div>
              </div>
            );
          } else {
            return null; // Render nothing if stream.id is not present
          }
        });
      }
      
    renderCreate(){
        if(this.props.isSignedIn){
            return(<div style={{textAlign : 'right'}}>
                <Link to='/stream/new' className='ui button purple'>Create stream</Link>
            </div>)
        }
    }
    render() {
        if (this.props.error) {
          return (
            <div>
              <h2>Error</h2>
              <div className="ui error message">
                <div className="header">An error occurred:</div>
                <p>{this.props.error}</p>
              </div>
              {this.renderCreate()}
            </div>
          );
        }
      
        return (
          <div>
            <h2>Streams</h2>
            <div className="ui celled list">{this.renderList()}</div>
            {this.renderCreate()}
          </div>
        );
      }
}
const mapStateToProps=(state)=>{
    return {streams : Object.values(state.streams),
            currentUserEmail : state.auth.userEmail,
            error : state.streams.error,
        isSignedIn:state.auth.isSignedIn}
}
export default connect(mapStateToProps,{fetchStreams})(StreamList);