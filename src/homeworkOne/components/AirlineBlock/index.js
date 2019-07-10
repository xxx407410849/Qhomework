import React from 'react';
import './index.less';
import { Icon } from 'antd';


class AirLineBlock extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        let { departure, arrive, departureTime, arriveTime, planeCode, planeType, planeCompy , share , tips , price ,off} = this.props.airlineInfo;
        return (
            <div className="air-ctn">
                <div className="left-block">
                    <div className="air-info">
                        <div className="info-departure">
                            <span className="info-time">{departureTime}</span>
                            <span className="info-airport">{departure}</span>
                        </div>
                        <div className="info-icon">
                            <span className = "icon-line"></span>
                            <Icon type="swap-right" />
                        </div>
                        <div className="info-arrive">
                            <span className="info-time">{arriveTime}</span>
                            <span className="info-airport">{arrive}</span>
                        </div>
                    </div>
                    <div className="plane-info">
                        <span>{planeCompy + planeCode + " " + planeType}</span>
                        {share ? <span className = "plane-share"></span> : null}
                    </div>
                </div>
                <div className="right-block">
                    <div className="price">¥ <span>{price}</span></div>
                    {off ? <span className="off">{off}</span> : null}
                    {tips ? <span className="tips">{tips}</span> : null}
                </div>
            </div>
        )
    }
}

export default AirLineBlock;