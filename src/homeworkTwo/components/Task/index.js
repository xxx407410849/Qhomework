import React from 'react';
import './index.less';
import { connect } from 'react-redux';
import { deleteTask, selectTask } from '../../actions';

class Task extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showDelete : false //默认不显示删除
        }
    }
    deleteTaskHandle = () => {
        this.props.dispatch(deleteTask(this.props.taskInfo.name));
    };
    checkboxSelectHandle = (e) => {
        this.props.dispatch(selectTask(this.props.taskInfo.name,e.target.checked));
    };
    taskHoverHandle = () => {
        this.setState({
            showDelete : true
        });
    };
    taskLeaveHandle = () => {
        this.setState({
            showDelete : false
        });
    };
    render(){
        let {name,status} = this.props.taskInfo;
        return (
            <div className = {"task-ctn" + (status ? " task-finished" : "")} onMouseEnter = {this.taskHoverHandle} onMouseLeave = {this.taskLeaveHandle}>
                <input type = "checkbox" onClick = {this.checkboxSelectHandle}/>
                <span className = "task-name">{name}</span>
                <span 
                    className = "task-delete" 
                    onClick = {this.deleteTaskHandle}
                    style = {{display : (this.state.showDelete ? "inline-block" : "none")}}
                >删除</span>
            </div>
        )
    }
}
function select(state){
    return {
        two : state.two
    }
}
export default connect(select)(Task);