import React from 'react';
import wrapper from '../store/configureStore';
import withReduxSaga from 'next-redux-saga';

// 페이지의 공통

const App = ({ Component }) => {
    return <Component />;
};

export default wrapper.withRedux(withReduxSaga(App));
