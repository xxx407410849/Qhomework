import React from 'react';
import './index.less';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import DateBtn from './components/DateBtn/index';
import AirLineBlock from './components/AirlineBlock/index';
import fetch from '../common/fetch.jsx';
import { Host } from '../config/host.jsx';
class HomeWorkOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectDate: "", //默认没有选中的日期
            isHide: "", //默认不隐藏选框
            dateList: [],
            airlineInfo: []
        };
        this.canCheck = true; //函数节流
    }
    componentWillMount(){
        let options = {
            method : "GET",
            url : Host.prodHost.nodeHost + Host.hosts.airlineInfo
        }
        let options_1 = {
            method : "GET",
            url : Host.prodHost.nodeHost + Host.hosts.dateInfo
        }
        fetch(options).then((data)=>{
            this.setState({
                airlineInfo : data
            })
        })
        .catch((err)=>{
            console.log(err);
        });
        fetch(options_1).then((data)=>{
            this.setState({
                dateList : data
            })
        })
        .catch((err)=>{
            console.log(err);
        });

    };
    _dateClickHandle = (item) => {
        this.setState({
            selectDate: item.date
        });
    };
    _bodyScroller = () => {
        if(!this.canCheck)return;
        this.canCheck = false;
        this.timer = setTimeout(() => {
            this.canCheck = true
        },10);
        let scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
        if(scrollTop <= 20 && this.state.isHide){
            this.setState({
                isHide : false
            })
        }
        if(scrollTop > 50 && !this.state.isHide){
            this.setState({
                isHide : true
            })
        };
    };
    componentDidMount(){
        window.document.body.onscroll = this._bodyScroller;
    };
    componentWillUnmount(){
        window.document.body.onscroll = null;
        clearInterval(this.timer);
    }
    render() {
        return (
            <div className="one-body">
                <div className="one-header">
                    <span className="h-left"><Icon type="left" /></span>
                    <span className="h-title">北京<Icon type="swap-right" />上海</span>
                    <span className="h-right"><Icon type="search" /></span>
                </div>
                <div className={"one-dateBar" + (this.state.isHide === false ? " show" : "") + (this.state.isHide === true ? " hide" : "") }>
                    {
                        this.state.dateList.map((item) => {
                            return <DateBtn
                                dateInfo={item}
                                key={item.date}
                                selectDate={this.state.selectDate}
                                clickHandle={this._dateClickHandle} />
                        })
                    }
                    <div className="date-more">
                        <Icon type="table" className="date-icon" />
                        <span>更多日期</span>
                    </div>
                </div>
                <div className="one-airline" ref = "airline">
                    {
                        this.state.airlineInfo.map((item,idx)=>{
                            return <AirLineBlock airlineInfo = {item} key = {idx}/>
                        })
                    }
                </div>
                <div className={"one-footer" + (this.state.isHide === false ? " show" : "") + (this.state.isHide === true ? " hide" : "")}>
                    <div className = "chooseBar">
                        <div className = "block">
                            <Icon type="filter" className = "footer-icon"/>
                            <span>筛选</span>
                        </div>
                        <div className = "block">
                            <Icon type="column-height" className = "footer-icon"/>
                            <span>推荐排序</span>
                        </div>
                        <div className = "block">
                            <Icon type="clock-circle" className = "footer-icon"/>
                            <span>时间</span>
                        </div>
                        <div className = "block">
                            <Icon type="money-collect" className = "footer-icon"/>
                            <span>价格</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function select(state) {
    return {
        one: state.one
    }
}
export default connect(select)(HomeWorkOne);