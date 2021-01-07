import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from "./components/App"
import store from './store';

// react-redux의 subscribe기능을 사용하기 위해 provider을 사용
// subscribe자체가 store를 구독하는 것. 따라서 Provider에 store을 props로 내릴 것임.

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

