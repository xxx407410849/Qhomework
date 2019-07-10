export const threeActions = {
    UPLOAD_URL_FAIL : "UPLOAD_URL_FAIL",
    UPLOAD_URL_SUC : "UPLOAD_URL_SUC",
    UPLOAD_URL : "UPLOAD_URL",
    FETCH_ARTICLEINFO_FAIL : "FETCH_ARTICLEINFO_FAIL",
    FETCH_ARTICLEINFO_SUC : "FETCH_ARTICLEINFO_SUC"
}

import { Host } from '../../config/host.jsx';
import fetch from '../../common/fetch.jsx';
import { message } from 'antd';



export function uploadUrl(url){
    return dispatch => {
        dispatch(uploadUrlChangeState());
        let options = {
            url : Host.prodHost.nodeHost + Host.hosts.uploadUrl,
            data : {
                url : url
            }
        }
        fetch(options).then((data)=>{
            if(data.ret){
                dispatch(uploadUrlSuc());
                dispatch(getArticleList());
            }else{
                dispatch(uploadUrlFail(data.errMsg));
            }
        })
        .catch(()=>{
            dispatch(uploadUrlFail());
        })
    }
}

const uploadUrlFail = (errMsg = "网络链接失败") => {
    message.error(errMsg);
    return {
        type : threeActions.UPLOAD_URL_FAIL
    }
}

const uploadUrlSuc = (data) => {
    return {
        type : threeActions.UPLOAD_URL_SUC
    }
}

const uploadUrlChangeState = () => {
    return {
        type : threeActions.UPLOAD_URL
    }
}

export function getArticleList(){
    return dispatch => {
        let options = {
            method : "GET",
            url : Host.prodHost.nodeHost + Host.hosts.getArticleList
        }
        fetch(options).then((data)=>{
            if(data.ret){
                dispatch(getArticleListSuc(data.data));
            }else{
                dispatch(getArticleListFail(data.errMsg));
            }
        })
        .catch((err)=>{
            dispatch(getArticleListFail());
        })
        
    }
}

const getArticleListSuc = (data) => {
    return {
        type : threeActions.FETCH_ARTICLEINFO_SUC,
        data : data
    }
}
const getArticleListFail = (errMsg = "网络连接失败") => {
    message.error(errMsg);
    return {
        type : threeActions.FETCH_ARTICLEINFO_FAIL
    }
}