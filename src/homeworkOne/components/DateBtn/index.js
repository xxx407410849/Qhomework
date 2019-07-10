import React from 'react';
import './index.less';

class DateBtn extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    dateBtnClickHandle = () => {
        let { dateInfo, clickHandle, selectDate } = this.props;
        if(selectDate === dateInfo.date)return;
        clickHandle(dateInfo);
    }
    render() {
        let { dateInfo, selectDate } = this.props;
        return (
            <div
                className={(selectDate === dateInfo.date ? "dateBtn-selected " : "") + "dateBtn-ctn"}
                onClick={this.dateBtnClickHandle}
            >
                <span className="dataBtn-date">{dateInfo.date}</span>
                <span className="dataBtn-week">{dateInfo.week}</span>
                <span className="dataBtn-lowPrice">¥{dateInfo.lowPrice}</span>
            </div>
        )
    }
}

export default DateBtn;