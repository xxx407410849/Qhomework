import React from 'react';
import './index.less';

import { Form, Button, Icon, Input } from 'antd';
import { uploadUrl } from '../../actions';
import { connect } from 'react-redux';

const regWebSite = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/;
class WebInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    sumbitHandle = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (err) {
                return;
            }
            this.props.dispatch(uploadUrl(value.website))
        })
        // this.props.dispatch(uploadUrl())
    };
    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const websiteError = isFieldTouched('website') && getFieldError('website');
        return (
            <Form layout="inline" onSubmit={this.sumbitHandle} className = "website-form">
                <Form.Item validateStatus={websiteError ? 'error' : ''} help={websiteError || ''}>
                    {getFieldDecorator('website', {
                        rules: [
                            { required: true, message: '网址不能为空' },
                            { pattern: regWebSite, message: '请输入正确的网址,注意添加协议头' }
                        ],
                    })(
                        <Input
                            prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="link"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={this.hasErrors(getFieldsError()) || !this.props.three.uploadloading}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const WrappedWebInput = Form.create({ name: 'websiteForm' })(WebInput);

function select(state){
    return {
        three : state.three
    }
}
export default connect(select)(WrappedWebInput);