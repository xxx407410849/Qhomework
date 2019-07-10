import React from 'react';
import './index.less';
import { connect } from 'react-redux';
import Task from './components/Task/index';
import { saveTask } from './actions';

class HomeWorkTwo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taskInputValue : ""
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }
    saveTaskHandle = () => {
        if(!this.state.taskInputValue){
            alert("别让你的计划空空如也");
            return;
        };
        for (const item of this.props.two.taskList) {
            if(item.name === this.state.taskInputValue){
                alert("不要踏进相同的河流");
                return;
            }
        }
        this.props.dispatch(saveTask(this.state.taskInputValue))
    };
    taskInputChangeHandle = (e) => {
        console.log(e.target.value);
        this.setState({
            taskInputValue : e.target.value
        })
    };
    taskInputKeyClickHandle = (e) => {
        if(e.keyCode === 13){
            console.log(111);
            this.saveTaskHandle();
        }
    }
    render(){
        let {two} = this.props;
        return (
            <div className = "two-ctn">
                <p className = "two-title">React Todo</p>
                <div className = "two-body">
                    {
                        two.taskList.map((item , idx)=>{
                            return <Task taskInfo = {item} key = {item.name} />
                        })
                    }
                    <div className = "task-info">
                        <span>{two.finishedTaskNum}已完成 / </span>
                        <span>{two.taskNum}任务总量</span>
                    </div>
                </div>
                <div className = "two-footer">
                    <p className = "footer-input">
                        <span>Task</span>
                        <input 
                            type = "text" 
                            onChange = {this.taskInputChangeHandle}
                            onKeyDown= {this.taskInputKeyClickHandle}
                            value = {this.state.taskInputValue}
                            placeholder = "写下你的计划"
                        />
                    </p>
                    <div className = "footer-btn" onClick = {this.saveTaskHandle}>Save Task</div>
                </div>
            </div>
        )
    }
}
function select(state){
    return {
        two : state.two
    }
}
export default connect(select)(HomeWorkTwo)