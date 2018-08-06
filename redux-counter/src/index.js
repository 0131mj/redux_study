import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'

// 리덕스 관련 불러오기
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers';


const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);