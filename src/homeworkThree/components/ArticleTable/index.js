import React from 'react';
import './index.less';

import { Table, Icon } from 'antd';
import { connect } from 'react-redux';
const columns = [{
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    align: "center",
    width: 300,
    render: (item,record) => {
        return (<a href = {record.url}>{record.title}</a>)
    }
}, {
    title: '字数',
    dataIndex: 'totalNum',
    key: 'totalNum',
    align: "center",
    width: 200
}, {
    title: '中文字数',
    dataIndex: 'chNum',
    key: 'chiNum',
    align: "center",
    width: 200
}, {
    title: '英文字数',
    dataIndex: 'enNum',
    key: 'engNum',
    align: "center",
    width: 200
},
{
    title: '标点符号数',
    dataIndex: 'signNum',
    key: 'signNum',
    align: "center",
    width: 200
}];
class ArticleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        let { articleList, uploadloading } = this.props.three;
        return (
            <Table
                className="table-article"
                columns={columns}
                bordered={true}
                dataSource={articleList}
                rowKey="_id"
                loading={!uploadloading}
            />
        )
    }
}
function select(state) {
    return {
        three: state.three
    }
}

export default connect(select)(ArticleTable);