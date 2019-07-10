import { twoActions } from "../actions";

let initState = {
    taskList : [], //计划列表
    finishedTaskNum : 0, //完成任务量
    taskNum : 0 //任务总量
}

export default function twoReducer(state = initState, action) {
    switch (action.type) {
        case twoActions.DELETE_TASK:
            let newTaskList = [...state.taskList];
            let newFinishedTaskNum = state.finishedTaskNum;
            for (const i in newTaskList) {
                if (newTaskList.hasOwnProperty(i)) {
                    const item = newTaskList[i];
                    if(item.name === action.name){
                        if(item.status){
                            newFinishedTaskNum = newFinishedTaskNum - 1;
                        }
                        newTaskList.splice(i , 1);
                        break;
                    }
                }
            }
            return {
                ...state,
                taskList : newTaskList,
                taskNum : state.taskNum - 1,
                finishedTaskNum : newFinishedTaskNum
            };
        case twoActions.SAVE_TASK:
            return {
                ...state,
                taskList : [...state.taskList , {name : action.name , status : false}],
                taskNum : state.taskNum + 1
            };
        case twoActions.SELECT_TASK:
            newTaskList = [...state.taskList];
            newFinishedTaskNum = state.finishedTaskNum;
            for (const i in newTaskList) {
                if (newTaskList.hasOwnProperty(i)) {
                    const item = newTaskList[i];
                    if(item.name === action.name){
                        if(item.status){
                            newFinishedTaskNum = newFinishedTaskNum - 1;
                        }else{
                            newFinishedTaskNum = newFinishedTaskNum + 1;
                        }
                        newTaskList[i].status = !newTaskList[i].status;
                        break;
                    }
                }
            }
            return {
                ...state,
                taskList : newTaskList,
                finishedTaskNum : newFinishedTaskNum
            };
        default: 
            return state;
    }
}