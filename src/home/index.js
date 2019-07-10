import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './index.less';
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div className = "home-body">
                <div className = "home-ctn">
                    <div className = "home-inner">
                        <Link to = "/homework1">作业1: 业务系统移动前端开发</Link>
                        <Link to = "/homework2">作业2: TodoList</Link>
                        <Link to = "/homework3">作业3: 综合作业</Link>
                    </div>
                </div>
            </div>
        )
    }
}
function select(state){
    return {
        home : state.home
    }
}
export default connect(select)(Home)