import actionTypes from './actionTypes'


const initState = {
    user: null,
    toDos: []
}


const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload.user
            }

        case actionTypes.SET_TODOS:
            return {
                ...state,
                toDos: action.payload.toDo
            }

        
        case actionTypes.UPDATE_STATUS:
            let updatedToDos = state.toDos.map(toDo => {
                if(toDo.id === action.payload.id) {
                    return {
                        ...toDo,
                        status: action.payload.status
                    }
                }else {
                    return toDo
                }
            })

            return {
                ...state,
                toDos: updatedToDos
            }

        
        case actionTypes.DELETE_TODO:
            let newToDos = state.toDos.filter(toDo => toDo.id !== action.payload.id)

            return {
                ...state,
                toDos: newToDos
            }


        case actionTypes.EDIT_TODO:
            let edittedToDos = state.toDos.map(toDo => {
                if(toDo.id === action.payload.id){
                    return {
                        ...toDo,
                        text: action.payload.newToDo
                    }
                }else {
                    return toDo
                }
            })

            return {
                ...state,
                toDos: edittedToDos
            }


        default:
            console.log("REDUCER: default")
            return state
    }
}


export default reducer
