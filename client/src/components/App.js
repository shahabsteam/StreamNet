import React from 'react'
import { Route,Router } from 'react-router-dom'
import StreamCreate from './streams/StreamCreate'
import StreamEdit from './streams/StreamEdit'
import StreamDelete from './streams/StreamDelete'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'
import Header from './Header'
import history from '../history'
import Footer from './Footer'
import Login from './Login'


const App = ()=>{
    return (
        <div className='ui container'>
            
            <Router history ={history}>
            <Header/>
            
                <div>
                    <Route path='/' exact component={StreamList}/>
                    <Route path='/login' exact component = {Login}/>
                    <Route path='/stream/new' exact component={StreamCreate}/>
                    <Route path='/streams/edit/:id' exact component={StreamEdit}/>
                    <Route path='/streams/delete/:id' exact component={StreamDelete}/>
                    <Route path='/streams/:id' exact component={StreamShow}/>
                </div>
            </Router>
            <Footer/>
        </div>
    )
}
export default App;