import React from 'react'
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flv from 'flv.js'
import { socket } from '../../apis/socket';

class StreamShow extends React.Component{
    constructor(props){
        super(props);
        this.videoRef = React.createRef();
        this.state = {error : null}
    }
    componentDidMount(){
        const {id} = this.props.match.params
        this.props.fetchStream(id);
        this.buildPlayer();
        
    socket.emit('join', { room: `room${this.props.match.params.id}` });
}
      
    buildPlayer(){
        const {id} = this.props.match.params
        if(this.player || !this.props.stream){
            return
        }
        try{
            this.player =  flv.createPlayer({
                type:'flv',
                //TODO : add dynamic link for stream pages
                url : `http://localhost:8000/live/${id}.flv`
            })
            
            this.player.on( flv.Events.ERROR ,
                 (err, errdet) =>{
                    console.log(err)
                   this.setState({error : err});
                 })
             this.player.attachMediaElement(this.videoRef.current)
            this.player.load()
        }catch(error){
            console.log("err");
        }

    }
    componentDidUpdate(){
        this.buildPlayer();
    }
    componentWillUnmount(){
        // this.player.destroy();
    }
    render(){
        if(!this.props.stream){
            return <div>.</div>
        }
            const{title,description}=this.props.stream;
            
        return (
            
            <div>
              {this.renderError()}
                <video 
                style={{width:'100%'}}
                controls={true}
                 ref={this.videoRef}/>
                <h1>{title}</h1>
                <h5>{description}</h5>
                
            </div>
        )
    }
    renderError(){
        console.log("error called");
        if(this.state.error){
            return (
                <div>
                <h2>Error</h2>
                <div className="ui error message">
                  <div className="header">An error occurred:</div>
                  <p>{this.state.error}</p>
                </div>
    
              </div>
            )
        }

    }
}
const mapStateToProps = (state,ownProps)=>{
   
    return {   
        stream : state.streams[ownProps.match.params.id], }
}
export default connect(mapStateToProps,{fetchStream})(StreamShow);