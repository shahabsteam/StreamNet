import React from 'react';
import App from './components/App'
import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose } from 'redux';
import reduxThunk from 'redux-thunk'
import ReactDOM from 'react-dom'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers
    ,composeEnhancers(applyMiddleware(reduxThunk)))
    store.subscribe(() => {
        const { auth } = store.getState();
        localStorage.setItem('authState', JSON.stringify(auth));
      });
ReactDOM.render(
    <Provider store={store} >
    <App/>
    </Provider>
    , document.querySelector('#root')
)