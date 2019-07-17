import React from 'react';
import { Route, Link, BrowserRouter, Switch, Router, Redirect,HashRouter } from 'react-router-dom';
import store from './src/reducer/store.jsx';
import asnycLoad from './src/common/asnycLoad.jsx';
import { Provider, connect } from 'react-redux';
import { Host } from './src/config/host.jsx';
import fetch from './src/common/fetch.jsx';

//redux监控
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
})

//-----页面注册----
const Home = asnycLoad(() => import('./src/home/index'));
const One = asnycLoad(() => import('./src/homeworkOne/index'));
const Two = asnycLoad(() => import('./src/homeworkTwo/index'));
const Three = asnycLoad(() => import('./src/homeworkThree/index'));

class UNDO extends React.Component {
    render(){
        return (
            <div>
                <p>本页面暂时未竣工</p>
            </div>
        )
    }
}
export default (
    <HashRouter>
        <Provider store={store}>
            <div style={{ "height": "100%", "width": "100%" }}>
                <Route exact path="/" component={Home} />
                <Route exact path="/homework1" component={One}/>
                <Route exact path="/homework2" component={Two}/>
                <Route exact path="/homework3" component={Three}/>
            </div>
        </Provider>
    </HashRouter>
) 