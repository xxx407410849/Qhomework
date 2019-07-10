import React from 'react';
import './index.less';
import { connect } from 'react-redux';
import ArticleTable from './components/ArticleTable/index';
import WrappedWebInput from './components/WebInput/index';
import { getArticleList } from './actions';
class HomeWorkThree extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.props.dispatch(getArticleList());
    }
    render(){
        return (
            <div className = "three-ctn">
                <WrappedWebInput />
                <ArticleTable />
            </div>
        )
    }
}

function select(state){
    return {
        three : state.three
    }
}

export default connect(select)(HomeWorkThree);