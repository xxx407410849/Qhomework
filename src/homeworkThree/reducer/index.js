import { threeActions } from "../actions";

let initState = {
    uploadloading : true, //默认不是加载中
    articleList : [] //文章列表
}

export default function ThreeReducer(state = initState, action) {
    switch (action.type) {
        case threeActions.UPLOAD_URL_FAIL:
            return {
                ...state,
                uploadloading : true
            }
        case threeActions.UPLOAD_URL_SUC:
            return state
        case threeActions.UPLOAD_URL:
            return {
                ...state,
                uploadloading : false
            }
        case threeActions.FETCH_ARTICLEINFO_SUC:
            return {
                ...state,
                articleList : action.data,
                uploadloading : true
            }
        case threeActions.FETCH_ARTICLEINFO_FAIL:
            return {
                ...state,
                uploadloading : true
            }
        default: return state
    }
}