export const twoActions = {
    DELETE_TASK : "DELETE_TASK",
    SAVE_TASK : "SAVE_TASK",
    SELECT_TASK : "SELECT_TASK"
}

export function deleteTask(name){
    return {
        name : name,
        type : twoActions.DELETE_TASK
    }
}
export function saveTask(name){
    return {
        name : name,
        type : twoActions.SAVE_TASK
    }
}
export function selectTask(name,status){
    console.log(name,status);
    return {
        name : name,
        status : status,
        type : twoActions.SELECT_TASK
    }
}