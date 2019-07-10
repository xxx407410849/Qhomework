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
class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthor: true, //默认登录
            isAuthorType: false //默认无功能权限
        }
    }
    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }
    requireAuth = () => {
        if (location.pathname != "/") {
            if (this.props.home.userName || this.props.login.loginStatus) return true;
            else return false;

        }
        return true;
    }
    render() {
        const { component: Component, home, login, accessType, ...rest } = this.props;
        let userType = home.type || login.userType;
        return (
            <Route
                {...rest}
                render={props => {
                    if (!home.reloadStatus && !login.loginLoading) return <div>Loading</div>;
                    if (!(home.userName || login.loginStatus))message.warning("请先登录");
                    return (home.userName || login.loginStatus)
                        ? (!accessType || [...accessType].indexOf(userType) != -1 ?
                            <Component {...props} /> :
                            <Redirect
                                to={{
                                    pathname: '/block',
                                    state: { from: props.location }
                                }}
                            />)
                        : (<Redirect
                            to={{
                                pathname: '/',
                                state: { from: props.location }
                            }}
                        />)
                }
                }
            >
            </Route>
        )
    }
}
function select(state) {
    return {
        login: state.login,
        home: state.home
    };
}

PrivateRoute = connect(select, null, null, { pure: false })(PrivateRoute);

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