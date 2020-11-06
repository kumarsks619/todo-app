import actionTypes from './actionTypes'


export const setUser = (user) => (
    {
        type: actionTypes.SET_USER,
        payload: {
            user,
        }
    }
)


export const setToDos = (toDo) => (
    {
        type: actionTypes.SET_TODOS,
        payload: {
            toDo,
        }
    }
)


export const updateStatus = (id, status) => (
    {
        type: actionTypes.UPDATE_STATUS,
        payload: {
            id,
            status,
        }
    }
)


export const deleteTodo = (id) => (
    {
        type: actionTypes.DELETE_TODO,
        payload: {
            id,
        }
    }
)


export const editToDo = (id, newToDo) => (
    {
        type: actionTypes.EDIT_TODO,
        payload: {
            id,
            newToDo
        }
    }
)