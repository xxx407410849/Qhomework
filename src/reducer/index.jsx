import {combineReducers} from 'redux';
import one from '../homeworkOne/reducer/index';
import two from '../homeworkTwo/reducer/index';
import three from '../homeworkThree/reducer/index';
export default combineReducers({
    one,
    two,
    three
})