import React from 'react'
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream  , deleteStream} from '../../actions';
import { Link } from 'react-router-dom';

class  StreamDelete extends React.Component {
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
     Renderactions = ()=>{
         const id =this.props.match.params.id;
         return(
        <React.Fragment>
            <button onClick={()=>this.props.deleteStream(id)} className='ui button negative'>Delete</button>
            <Link className='ui button ' to='/'>Cancel</Link>
            </React.Fragment>)}
       
       renderContent = ()=>{
           if(!this.props.stream){
               return 'are you sure you want to delete this stream'
           }else{
               return `are you sure you want to delete this stream with title : ${this.props.stream.title}`
           }
       }
    
    render(){
    return(<div>
        <Modal 
        onDismiss={()=>history.push('/')}
        title='Delete Stream'
        content = {this.renderContent()}
        actions ={this.Renderactions()}
        />
    </div>)
     }
}
const mapStateToProps=(state,ownProps)=>{
    return {
        stream : state.streams[ownProps.match.params.id]
    }
}
export default connect(mapStateToProps,{fetchStream,deleteStream})(StreamDelete);