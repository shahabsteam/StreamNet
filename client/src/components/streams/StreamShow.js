import React from 'react'
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flv from 'flv.js'
import { socket } from '../../apis/socket';
import "../../css/chatbox.css"
class StreamShow extends React.Component{
    constructor(props){
        super(props);
        this.videoRef = React.createRef();
        this.chatBoxRef = React.createRef();
        this.state = {error : null,
            chatMessages: [], // Array to store chat messages
            newMessage: '', // Input field value for new messages,
            username : this.props.username  ?  this.props.username : "guest"
        }
    }
    componentDidMount(){
        const {id} = this.props.match.params
        this.props.fetchStream(id);
        this.buildPlayer();
        
    socket.emit('join', { room: `room${this.props.match.params.id}` });

    socket.on('message', (message) => {
        this.setState((prevState) => ({
          chatMessages: [...prevState.chatMessages, message],
        }));
      });
}
sendMessage = () => {
    const { newMessage,username } = this.state;
    if(newMessage ==''){
        return;
    }
    socket.emit('chatMessage', {newMessage,username});
    
    this.setState({ newMessage: '' });
    this.scrollToBottom();
  };
  scrollToBottom = () => {
    console.log(this.chatBoxRef.current.scrollHeight)
    this.chatBoxRef.current.scrollTop = this.chatBoxRef.current.scrollHeight;
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  };
      
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
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ flex: '0 0 70%' }}>
                      <video style={{ width: '100%' }} controls ref={this.videoRef} />
                      <h1>{title}</h1>
                      <h5>{description}</h5>
                    </div>
                    <div style={{ flex: '0 0 30%', marginLeft: '20px' }}>
                      {this.renderChatBox()}
                    </div>
                  </div>
                </div>
              );
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

    renderChatBox() {
        const { chatMessages, newMessage } = this.state;
      
        return (
          <div className="ui segment chat-box"  ref={this.chatBoxRef}>
            <h3>Chat Box</h3>
      
            <div className="ui comments">
            {chatMessages.map((message, index) => (
          <div key={index}>

            <strong className="username">{message.username}: </strong>
            <span>{message.newMessage}</span>
          </div>
        ))}
            </div>
      
            <div className="ui action input chat-input-container">
              <input className='chat-input'
                type="text"
                placeholder="Type your message..."
                autofocus 
                value={newMessage}
                onChange={(e) => this.setState({ newMessage: e.target.value })}
                onKeyDown={this.handleKeyDown}
              />
              <button className="ui  button purple" onClick={this.sendMessage}>
                Send
              </button>
            </div>
          </div>
        );
      }
      
}
const mapStateToProps = (state,ownProps)=>{
   
    return {   
        stream : state.streams[ownProps.match.params.id],
    username : state.auth.userEmail }
}
export default connect(mapStateToProps,{fetchStream})(StreamShow);